import { expect, test } from "@playwright/test";

test("static homepage loads without missing resources or hydration errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/");
  await expect(page).toHaveTitle("爪爪 PAWPAL — 给毛孩子，刚刚好的宠爱");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await page.locator("#visit").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0),
        ),
    )
    .toBe(true);
  expect(errors).toEqual([]);
  await expect(page.locator(".illustrated-map-link")).toHaveAttribute(
    "href",
    /https:\/\/map.baidu.com\/search\//,
  );
});

test("booking preselects service, validates and preserves form, copies result", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "预约精致造型美容",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByLabel("想要的服务")).toHaveValue("精致造型美容");
  await page.getByRole("button", { name: "生成预约信息" }).click();
  await expect(page.locator("#bookingResult")).toBeHidden();
  await page.getByLabel("毛孩子的名字").fill("豆豆");
  const date = page.getByLabel("期望日期");
  await date.fill("2000-01-01");
  expect(
    await date.evaluate(
      (input: HTMLInputElement) => input.validity.rangeUnderflow,
    ),
  ).toBe(true);
  await date.fill((await date.getAttribute("min"))!);
  await page.getByRole("button", { name: "生成预约信息" }).click();
  await expect(page.locator("#resultText")).toContainText("豆豆（狗狗）");
  await expect(page.locator("#resultText")).toContainText("服务：精致造型美容");
  await expect(page.locator("#copyButton")).toBeFocused();
  await page.locator("#copyButton").click();
  await expect(page.locator("#copyStatus")).toContainText("已复制");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "豆豆（狗狗）",
  );
  await page.getByRole("button", { name: "返回修改" }).click();
  await expect(page.getByLabel("毛孩子的名字")).toHaveValue("豆豆");
  await expect(page.getByLabel("毛孩子的名字")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "关闭预约窗口" }).click();
  await expect(dialog).toBeHidden();
  await trigger.click();
  await page.mouse.click(1, 1);
  await expect(dialog).toBeHidden();
});

test("clipboard denial selects booking text and address for manual copying", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: /预约洗护/ }).click();
  await page.getByLabel("毛孩子的名字").fill("咪咪");
  const date = page.getByLabel("期望日期");
  await date.fill((await date.getAttribute("min"))!);
  await page.getByRole("button", { name: "生成预约信息" }).click();
  await page.locator("#copyButton").click();
  await expect(page.locator("#copyStatus")).toContainText("Ctrl/Cmd+C");
  expect(
    await page.evaluate(() => window.getSelection()?.toString()),
  ).toContain("咪咪");
  await page.keyboard.press("Escape");
  await page.locator("#copyAddress").click();
  await expect(page.locator("#addressCopyStatus")).toContainText("已选中地址");
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(
    "上海市闵行区江川路街道沧源路595号",
  );
});

test("address copies successfully", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.locator("#copyAddress").click();
  await expect(page.locator("#addressCopyStatus")).toContainText("地址已复制");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "上海市闵行区江川路街道沧源路595号",
  );
});

test("mobile navigation and touch carousel retain their behavior", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "展开导航" }).click();
  await expect(page.locator(".menu")).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "店内环境", exact: true }).click();
  await expect(page).toHaveURL(/#environment$/);
  await expect(page.locator(".menu")).toHaveAttribute("aria-expanded", "false");
  const viewport = page.locator(".space-viewport");
  await viewport.evaluate((element) => {
    element.dispatchEvent(new TouchEvent("touchstart", {
      bubbles: true,
      touches: [new Touch({ identifier: 1, target: element, clientX: 300, clientY: 200 })],
    }));
    element.dispatchEvent(new TouchEvent("touchend", {
      bubbles: true,
      changedTouches: [new Touch({ identifier: 1, target: element, clientX: 100, clientY: 205 })],
    }));
  });
  await expect(page.locator("#spaceTitle")).toHaveText("专业洗护区");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("carousel supports buttons, thumbnails, keys, pause and reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".space-pause")).toHaveText("▷ 播放轮播");
  await page.getByRole("button", { name: "下一张店内环境" }).click();
  await expect(page.locator("#spaceTitle")).toHaveText("专业洗护区");
  await page.locator(".space-choice").nth(2).click();
  await expect(page.locator("#spaceTitle")).toHaveText("美容护理区");
  await page.locator(".space-carousel").press("ArrowRight");
  await expect(page.locator("#spaceTitle")).toHaveText("迎宾接待区");
  await page.getByRole("button", { name: "上一张店内环境" }).click();
  await expect(page.locator("#spaceTitle")).toHaveText("美容护理区");
  await expect(page.locator("#spaceStatus")).toContainText("第 3 张，共 3 张");
  await expect(page.locator(".space-slide[aria-hidden=false]")).toHaveCount(1);
  await page.getByRole("button", { name: "开始自动轮播" }).click();
  await expect(page.locator(".space-pause")).toHaveText("Ⅱ 暂停轮播");
  await page.getByRole("button", { name: "暂停自动轮播" }).click();
  await expect(page.locator(".space-pause")).toHaveText("▷ 播放轮播");
});

test("automatic carousel pauses on hover, focus and outside the viewport", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await page.goto("/");
  await page.locator(".space-carousel").scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(100);
  await page.clock.fastForward(6100);
  await expect(page.locator("#spaceTitle")).toHaveText("专业洗护区");
  await page.locator(".space-carousel").hover();
  await page.clock.fastForward(6100);
  await expect(page.locator("#spaceTitle")).toHaveText("专业洗护区");
  await page.locator(".space-carousel").focus();
  await page.mouse.move(0, 0);
  await page.clock.fastForward(6100);
  await expect(page.locator("#spaceTitle")).toHaveText("专业洗护区");
  await page
    .locator(".space-carousel")
    .evaluate((element) => (element as HTMLElement).blur());
  await page.locator("h1").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.clock.fastForward(6100);
  await expect(page.locator("#spaceTitle")).toHaveText("专业洗护区");
});
