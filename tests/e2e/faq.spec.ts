import { expect, test } from "@playwright/test";
import { faq } from "../../src/data/faq";

test.describe("faq page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/faq/");
  });

  test("has one h1 and lists every entry as a closed details element", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    const entries = page.locator("details");
    await expect(entries).toHaveCount(faq.length);
    for (let i = 0; i < faq.length; i++) {
      await expect(entries.nth(i).locator("summary")).toContainText(faq[i].question);
      await expect(entries.nth(i)).not.toHaveAttribute("open", "");
    }
  });

  test("reveals an answer on click", async ({ page }) => {
    const entry = page.locator("details").first();
    await entry.locator("summary").click();
    await expect(entry).toHaveAttribute("open", "");
    await expect(entry.getByText(faq[0].answer)).toBeVisible();
  });

  test("reveals an answer by keyboard", async ({ page }) => {
    const entry = page.locator("details").nth(1);
    await entry.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(entry).toHaveAttribute("open", "");
    await expect(entry.getByText(faq[1].answer)).toBeVisible();
  });

  test("has every answer present in the page HTML", async ({ page }) => {
    const html = await page.content();
    for (const entry of faq) {
      expect(html).toContain(entry.answer.replace(/&/g, "&amp;"));
    }
  });
});
