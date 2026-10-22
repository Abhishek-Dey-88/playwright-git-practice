// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Parallel on CI; locally one after another, in file order */
  fullyParallel: !!process.env.CI,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Default worker count on CI; a single worker locally so only one test runs at a time */
  workers: process.env.CI ? undefined : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["allure-playwright", { resultsDir: "allure-results" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://parabank.parasoft.com/parabank/",

    launchOptions: {
      // Opt-in only, e.g. SLOWMO=500 npx playwright test (was a fixed 1000ms on every action)
      slowMo: Number(process.env.SLOWMO) || 0,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        // Headed locally, headless on CI (CI runners have no display)
        headless: !!process.env.CI,
        // CI records everything; locally only video always, screenshot/trace on failure
        screenshot: process.env.CI ? "on" : "only-on-failure",
        trace: process.env.CI ? "on" : "retain-on-failure",
        video: "on",
        // viewport:{width:1080,height:720},
        ...devices["Desktop Chrome"],
        //  ...devices['iPhone 16 Pro Max landscape'], //''-->will show all mobile options
        // ...devices['Galaxy S III landscape'],
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
      },
    },

    // {
    //     name:'firefox',
    //      use:
    //   {
    //     browserName: 'firefox',
    //     headless:true,
    //     screenshot:'only-on-failure',
    //    trace:'retain-on-failure',
    //    video:'retain-on-failure'
    //   },
    //   },

    //   {
    //     name:'safari',
    //      use:
    //   {
    //     browserName: 'webkit',
    //     headless:true,
    //     screenshot:'only-on-failure',
    //    trace:'retain-on-failure',
    //    video:'retain-on-failure'
    //   },
    // }
  ],
});
