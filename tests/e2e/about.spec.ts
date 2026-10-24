import { expect, test } from "@playwright/test";
import { show } from "../../src/data/show";

test.describe("about page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about/");
  });

  test("has one h1 and shows the show description", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    for (const paragraph of show.description) {
      await expect(page.getByText(paragraph)).toBeVisible();
    }
  });

  test("has one section per host with name and bio", async ({ page }) => {
    const hosts = page.getByTestId("host");
    await expect(hosts).toHaveCount(show.hosts.length);
    for (let i = 0; i < show.hosts.length; i++) {
      await expect(hosts.nth(i)).toContainText(show.hosts[i].name);
      await expect(hosts.nth(i)).toContainText(show.hosts[i].bio);
    }
  });
});
