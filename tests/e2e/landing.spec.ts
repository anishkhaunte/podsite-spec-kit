import { expect, test } from "@playwright/test";
import { show } from "../../src/data/show";
import { getFeaturedEpisode } from "../../src/lib/episodes";
import { formatDate, formatDuration } from "../../src/lib/format";

const featured = getFeaturedEpisode();

test.describe("landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the show name as the single h1, plus the tagline", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(show.name);
    await expect(page.getByText(show.tagline).first()).toBeVisible();
  });

  test("shows exactly one featured episode with all details", async ({ page }) => {
    const block = page.getByTestId("featured-episode");
    await expect(block).toHaveCount(1);
    await expect(block).toContainText(`Episode ${featured.number}`);
    await expect(block).toContainText(featured.title);
    await expect(block).toContainText(formatDate(featured.publishedOn));
    await expect(block).toContainText(formatDuration(featured.durationSeconds));
    await expect(block).toContainText(featured.description);
  });

  test("links to the episodes page", async ({ page }) => {
    await page.getByRole("link", { name: /browse all episodes/i }).click();
    await expect(page).toHaveURL(/\/episodes\/$/);
  });

  test("has the four header links", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const name of ["Home", "Episodes", "About", "FAQ"]) {
      await expect(nav.getByRole("link", { name })).toBeVisible();
    }
  });
});
