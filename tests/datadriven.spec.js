import { test, expect } from "@playwright/test";
import { POManager } from "../page/POManager.js";
import testData from '../utils/data.json' assert {type:'json'}


for (const data of testData)
{

test(`datadriventc ${data.username}`, async ({ page }) => {

  const pomanager = new POManager(page)
  const homepage = pomanager.gethomepage()
  const registrationPage = pomanager.getregistrationpage()

  await homepage.goTo();
  await homepage.clickonregisterlink();
  await registrationPage.fillregistrationform(
    data.firstname,
    data.lastname,
    data.address,
    data.city,
    data.state,
    data.zipcode,
    data.phonenumber,
    data.ssn,
    data.username,
    data.password
);
  await registrationPage.clickonregisterbtn();
  await page.waitForTimeout(2000);

  await expect(registrationPage.successregistrationmessage).toBeVisible();
})
};