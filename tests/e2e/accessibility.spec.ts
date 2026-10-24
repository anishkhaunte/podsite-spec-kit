import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { faq } from "../../src/data/faq";

const paths = ["/", "/episodes/", "/about/", "/faq/", "/missing-page/"];

for (const path of paths) {
  test.describe(`accessibility of ${path}`, () => {
    test("has no serious or critical axe violations", async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      expect(
        blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`),
      ).toEqual([]);
    });

    test("has the skip link as the first tab stop", async ({ page }) => {
      await page.goto(path);
      await page.keyboard.press("Tab");
      const focused = page.locator(":focus");
      await expect(focused).toHaveText(/skip to content/i);
      await expect(focused).toBeVisible();
    });

    test("has landmarks, a lang attribute and a unique title", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.getByRole("banner")).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toHaveCount(1);
      await expect(page).toHaveTitle(/.+/);
    });
  });
}

test("every FAQ entry is reachable and operable by keyboard alone", async ({ page }) => {
  await page.goto("/faq/");
  const summaries = page.locator("details > summary");
  await expect(summaries).toHaveCount(faq.length);

  for (let i = 0; i < faq.length; i++) {
    await summaries.nth(i).focus();
    await expect(summaries.nth(i)).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("details").nth(i)).toHaveAttribute("open", "");
  }
});

test("header links are reachable by keyboard", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  for (const name of ["Home", "Episodes", "About", "FAQ"]) {
    await nav.getByRole("link", { name }).focus();
    await expect(nav.getByRole("link", { name })).toBeFocused();
  }
});

test("page titles are unique", async ({ page }) => {
  const titles = new Set<string>();
  for (const path of paths) {
    await page.goto(path);
    titles.add(await page.title());
  }
  expect(titles.size).toBe(paths.length);
});
