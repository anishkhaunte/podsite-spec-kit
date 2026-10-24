import { expect, test } from "@playwright/test";
import { episodes } from "../../src/data/episodes";
import { getEpisodesNewestFirst, getFeaturedEpisode } from "../../src/lib/episodes";
import { formatDate, formatDuration } from "../../src/lib/format";

test.describe("episodes page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/episodes/");
  });

  test("has one h1 and lists exactly 20 episodes, newest first", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    const items = page.getByTestId("episode-item");
    await expect(items).toHaveCount(20);
    expect(episodes).toHaveLength(20);

    const expected = getEpisodesNewestFirst();
    for (let i = 0; i < expected.length; i++) {
      await expect(items.nth(i)).toContainText(`Episode ${expected[i].number}`);
    }
  });

  test("shows every required detail for every episode", async ({ page }) => {
    const items = page.getByTestId("episode-item");
    const expected = getEpisodesNewestFirst();
    for (let i = 0; i < expected.length; i++) {
      const item = items.nth(i);
      await expect(item).toContainText(expected[i].title);
      await expect(item).toContainText(formatDate(expected[i].publishedOn));
      await expect(item).toContainText(formatDuration(expected[i].durationSeconds));
      await expect(item).toContainText(expected[i].description);
    }
  });

  test("includes the featured episode from the landing page", async ({ page }) => {
    const featured = getFeaturedEpisode();
    await expect(page.getByTestId("episode-item").filter({ hasText: featured.title })).toHaveCount(1);

    await page.goto("/");
    await expect(page.getByTestId("featured-episode")).toContainText(featured.title);
  });
});
