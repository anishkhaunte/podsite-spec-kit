import { expect, test } from "@playwright/test";

const paths = ["/", "/episodes/", "/about/", "/faq/", "/missing-page/"];

for (const path of paths) {
  test(`${path} has no horizontal scrolling`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
  });

  test(`${path} makes no requests to other origins`, async ({ page, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    const external: string[] = [];
    page.on("request", (request) => {
      const url = request.url();
      if (url.startsWith("http") && !url.startsWith(origin)) external.push(url);
    });
    await page.goto(path, { waitUntil: "networkidle" });
    expect(external).toEqual([]);
  });
}

test("keeps content readable on a wide desktop display", async ({ page }) => {
  await page.setViewportSize({ width: 2560, height: 1300 });
  await page.goto("/episodes/");
  const box = await page.locator("main > div").first().boundingBox();
  expect(box).not.toBeNull();
  // Content is constrained to a readable column rather than stretching edge to edge.
  expect(box!.width).toBeLessThanOrEqual(1200);
  const centerOffset = Math.abs(box!.x + box!.width / 2 - 2560 / 2);
  expect(centerOffset).toBeLessThanOrEqual(10);
});

test("keeps long text inside its container", async ({ page }) => {
  await page.goto("/episodes/");
  await page.addStyleTag({
    content:
      "[data-testid=episode-item] h2 { font-size: inherit; } [data-testid=episode-item] h2::after { content: ' Supercalifragilisticexpialidocious_Antidisestablishmentarianism_Pneumonoultramicroscopic'; }",
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
