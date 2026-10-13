import { test, expect } from "@playwright/test";
import { POManager } from "../page/POManager.js";
import { test_Data } from "../utils/datagenerator.js";

export const customtest = test.extend({
  pomanager: async ({ page }, use) => {
    await use(new POManager(page));
  },

  testdata: async ({}, use) => {
    await use(new test_Data());
  },

  testdataForregistration: async ({}, use) => {
    await use({
      firstname: "Testers",
      lastname: "Talk",
      city: "San Jose",
      address: "address1",
      state: "California",
      zipcode: "12345",
      phonenumber: "1234567898",
      ssn: "1234512345",
      username: "Testers",
      password: "1234567891",
      confirmpassword: "1234567891",
    });
  },
});

export { expect };
