import { test } from "@playwright/test";

// Logs each step to the console and wraps it in test.step so it also
// appears in the HTML / Allure reports and the trace viewer.
export function createStepLogger() {
  let count = 0;
  console.log(`\nMain test case executing: ${test.info().title}`);
  return async function step(message, fn) {
    count += 1;
    const label = `Step ${count} : ${message}`;
    console.log(label);
    return test.step(label, fn);
  };
}
