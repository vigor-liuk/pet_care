import { expect, test } from "@playwright/test";

for (const carousel of [
  { root: ".space-carousel", next: "下一张店内环境", pause: "暂停自动轮播", play: "开始自动轮播", active: ".space-slide.is-active" },
  { root: ".review-carousel", next: "下一条评价", pause: "暂停客户评价", play: "播放客户评价", active: ".review-card.is-active" },
]) {
  test(`${carousel.root} resumes after pointer navigation and explicit play`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.clock.install();
    await page.goto("/");
    const root = page.locator(carousel.root);
    await root.getByRole("button", { name: carousel.next, exact: true }).click();
    await expect(root.locator(carousel.active)).toHaveAttribute("aria-label", /第 2/);
    await page.mouse.move(0, 0);
    await page.clock.fastForward(6100);
    await expect(root.locator(carousel.active)).toHaveAttribute("aria-label", /第 3/);

    await root.getByRole("button", { name: carousel.pause, exact: true }).click();
    await page.mouse.move(0, 0);
    await page.clock.fastForward(6100);
    await expect(root.locator(carousel.active)).toHaveAttribute("aria-label", /第 3/);
    // Keyboard activation must also resume without forcing focus elsewhere.
    await root.getByRole("button", { name: carousel.play, exact: true }).press("Enter");
    await page.clock.fastForward(6100);
    await expect(root.locator(carousel.active)).toHaveAttribute("aria-label", /第 1/);
  });

  test.describe(`${carousel.root} touch`, () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });

    test("a tap does not leave autoplay stuck in hover or focus", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.clock.install();
      await page.goto("/");
      const root = page.locator(carousel.root);
      await root.getByRole("button", { name: carousel.next, exact: true }).tap();
      await expect(root.locator(carousel.active)).toHaveAttribute("aria-label", /第 2/);
      await page.clock.fastForward(6100);
      await expect(root.locator(carousel.active)).toHaveAttribute("aria-label", /第 3/);
    });
  });
}
