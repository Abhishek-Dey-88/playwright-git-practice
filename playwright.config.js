// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Superseded copy of e2etestscripts.spec.js: kept in the repo but not executed */
  testIgnore: ["**/old_e2etestscripts.spec.js"],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
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

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
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
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
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

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
