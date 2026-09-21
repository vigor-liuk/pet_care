import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3100",
    browserName: "chromium",
    channel: "chrome",
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npx serve dist -l 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
  },
});
