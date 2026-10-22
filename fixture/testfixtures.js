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

  // Registers a brand-new ParaBank user for this test (ParaBank credentials expire
  // after a few hours, so they cannot be reused). ParaBank logs the user in
  // automatically after registration, so the test starts on a logged-in page.
  registeredUser: async ({ pomanager, testdata }, use) => {
    const data = testdata.datafiller();
    const [username, password] = data.slice(8);

    await pomanager.gethomepage().goTo();
    await pomanager.gethomepage().clickonregisterlink();
    await pomanager.getregistrationpage().fillregistrationform(...data);
    await pomanager.getregistrationpage().clickonregisterbtn();
    await expect(
      pomanager.getregistrationpage().successregistrationmessage,
    ).toBeVisible();

    await use({ username, password });
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
