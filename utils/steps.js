import { test } from "@playwright/test";

// Logs each step to the console and wraps it in test.step so it also
// appears in the HTML / Allure reports and the trace viewer.
export function createStepLogger() {
  let count = 0;
  const heading = `Test case executing: ${test.info().title}`;
  const rule = "=".repeat(heading.length);
  console.log(`\n\x1b[1m${rule}\n${heading}\n${rule}\x1b[0m`);
  return async function step(message, fn) {
    count += 1;
    const label = `Step ${count} : ${message}`;
    console.log(label);
    return test.step(label, fn);
  };
}
