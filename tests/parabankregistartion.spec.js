import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { POManager } from "../page/POManager.js";


test("bankregistartion", async ({ page }) => {

  const pomanager = new POManager(page)
  const homepage = pomanager.gethomepage()
  const registrationPage = pomanager.getregistrationpage()

  const password = faker.internet.password();

  await homepage.goTo();
  await homepage.clickonregisterlink();
  await registrationPage.fillregistrationform(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.location.streetAddress(),
    faker.location.city(),
    faker.location.state(),
    faker.location.zipCode(),
    faker.phone.number(10),
    faker.string.numeric(9),
    faker.person.firstName(),
    password
  );
  await registrationPage.clickonregisterbtn();
  await page.waitForTimeout(2000);

  await expect(registrationPage.successregistrationmessage).toBeVisible();
});

// test.only("login", async ({ page }) => {
// const pomanager = new POManager(page)
//   const homepage = pomanager.gethomepage()

//   await homepage.goTo();
//   await homepage.login("test", "test123");
// });
