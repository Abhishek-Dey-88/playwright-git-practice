// @ts-check
import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config.js";

/**
 * Human-paced run for watching/demoing the tests: headed, one test at a time,
 * with a pause between every browser action. Not used by CI.
 * Run with: npm run test:human   (pace: HUMAN_SLOWMO env var in ms, default 700)
 */
export default defineConfig(baseConfig, {
  fullyParallel: false,
  workers: 1,
  use: {
    launchOptions: {
      slowMo: Number(process.env.HUMAN_SLOWMO) || 700,
    },
  },
  projects: [
    {
      name: "chrome",
      use: { headless: false },
    },
  ],
});
