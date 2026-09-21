import { expect, test } from "@playwright/test";

test("reviews support navigation, wraparound and mobile swipe", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#testimonials");
  const carousel = page.getByRole("region", { name: "客户评价" });
  const active = carousel.locator('.review-card[aria-hidden="false"]');
  await expect(active).toContainText("布丁的妈妈");
  await carousel.getByRole("button", { name: "上一条评价" }).click();
  await expect(active).toContainText("豆包的姐姐");
  await carousel.getByRole("button", { name: "下一条评价" }).click();
  await expect(active).toContainText("布丁的妈妈");
  await carousel.getByRole("button", { name: "查看第 2 条评价" }).click();
  await expect(active).toContainText("奶茶的爸爸");
  await carousel.press("ArrowRight");
  await expect(active).toContainText("豆包的姐姐");
  const viewport = carousel.locator(".review-viewport");
  await viewport.evaluate((element) => {
    const start = new Touch({ identifier: 1, target: element, clientX: 270, clientY: 200 });
    const end = new Touch({ identifier: 1, target: element, clientX: 100, clientY: 205 });
    element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
  });
  await expect(active).toContainText("布丁的妈妈");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(carousel.getByRole("button", { name: "暂停客户评价" })).toHaveCount(0);
  await carousel.screenshot({ path: "test-results/reviews-mobile.png" });
});

test("reviews autoplay and can be paused", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "客户评价" });
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(carousel.locator(".review-card.is-active")).toContainText("奶茶的爸爸", { timeout: 10000 });
  await carousel.getByRole("button", { name: "暂停客户评价" }).click();
  await page.mouse.move(0, 0);
  await carousel.evaluate((element) => { if (document.activeElement instanceof HTMLElement && element.contains(document.activeElement)) document.activeElement.blur(); });
  await page.waitForTimeout(6500);
  await expect(carousel.locator(".review-card.is-active")).toContainText("奶茶的爸爸");
  await expect(carousel.getByRole("button", { name: "播放客户评价" })).toBeVisible();
});
