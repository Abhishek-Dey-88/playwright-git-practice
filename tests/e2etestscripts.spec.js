import { customtest as test, expect } from "../fixture/testfixtures.js";

test.describe.configure({ mode: "serial" });

test("@regressionbankregistartioncheck", async ({ pomanager, testdata }) => {
  const data = testdata.datafiller();
  const [username, password] = data.slice(8);

  await pomanager.gethomepage().goTo();
  await pomanager.gethomepage().clickonregisterlink();
  await pomanager.getregistrationpage().fillregistrationform(...data); //... is a spread operator
  await pomanager.getregistrationpage().clickonregisterbtn();
  await expect(
    pomanager.getregistrationpage().successregistrationmessage,
  ).toBeVisible();

  testdata.savecredentials(username, password);
});

/*
for (const data of testData)
{

test(`datadriventc ${data.username}`, async ({ page }) => {

  const username =  `${data.username}${Date.now()}`;

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
    username,
    data.password
);
  await registrationPage.clickonregisterbtn();
  // await page.waitForTimeout(2000);

  // await expect(registrationPage.successregistrationmessage).toBeVisible();
})
};


ctest.("bankregistartion with fixtureS",async ({ page, testdataForregistration }) => {
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
  // await page.waitForTimeout(2000);

  // await expect(registrationPage.successregistrationmessage).toBeVisible();
});

*/

test("@regressionlogin&openewaccountcheck", async ({ pomanager, testdata }) => {
  await pomanager.gethomepage().goTo();
  const { username, password } = testdata.getlatestcredentials();
  await pomanager.gethomepage().login(username, password);
  await pomanager.getloggedinpage().loggedinuser();
  await pomanager.getaccountdetails().clinkonopennewaccountlink();
  await pomanager.getaccountdetails().selectaccount();
  await pomanager.getaccountdetails().clickopenaccountbtn();
  const accountDetails = await pomanager.getaccountdetails().getAccountOpenedText();
  console.log(`Account details:\n${accountDetails}`);
  await test.info().attach("account-details", {
    body: accountDetails,
    contentType: "text/plain",
  });
});

