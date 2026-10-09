import { POManager } from "../page/POManager.js";
import { customtest as test,expect } from "../fixture/testfixtures.js";

test("bankregistartion", async ({ page, testdataForregistration }) => {
  const pomanager = new POManager(page);
  const homepage = pomanager.gethomepage();
  const registrationPage = pomanager.getregistrationpage();

  await homepage.goTo();
  await homepage.clickonregisterlink();
  await registrationPage.fillregistrationform(
    testdataForregistration.firstname,
    testdataForregistration.lastname,
    testdataForregistration.address,
    testdataForregistration.city,
    testdataForregistration.state,
    testdataForregistration.zipcode,
    testdataForregistration.phonenumber,
    testdataForregistration.ssn,
    testdataForregistration.username,
    testdataForregistration.password,
  );
  await registrationPage.clickonregisterbtn();
  await page.waitForTimeout(2000);

  await expect(registrationPage.successregistrationmessage).toBeVisible();
});
