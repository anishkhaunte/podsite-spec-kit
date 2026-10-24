import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", label: "Home" },
  { path: "/episodes/", label: "Episodes" },
  { path: "/about/", label: "About" },
  { path: "/faq/", label: "FAQ" },
];

for (const from of pages) {
  test.describe(`navigation from ${from.path}`, () => {
    test("marks only the current page's link with aria-current", async ({ page }) => {
      await page.goto(from.path);
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(nav.getByRole("link", { name: from.label })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    for (const to of pages.filter((p) => p.path !== from.path)) {
      test(`reaches ${to.label} in one click`, async ({ page }) => {
        await page.goto(from.path);
        await page
          .getByRole("navigation", { name: "Main" })
          .getByRole("link", { name: to.label })
          .click();
        await expect(page).toHaveURL(new RegExp(`${to.path}$`));
        await expect(page.locator("h1")).toHaveCount(1);
      });
    }
  });
}

test.describe("not-found page", () => {
  test("shows a friendly page with a link back home for unknown addresses", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText(/lost/i);
    await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();

    await page.getByRole("link", { name: /back to the homepage/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
