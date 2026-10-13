import { customtest as test, expect } from "../fixture/testfixtures.js";
import { createStepLogger } from "../utils/steps.js";

test.describe.configure({ mode: "serial" });

test("@regressionbankregistartioncheck", async ({ pomanager, testdata }) => {
  const step = createStepLogger();
  const data = testdata.datafiller();
  const [username, password] = data.slice(8);

  await step("Homepage loading...", async () => {
    await pomanager.gethomepage().goTo();
  });
  await step("Clicking on Register link...", async () => {
    await pomanager.gethomepage().clickonregisterlink();
  });
  await step("Registration form loaded and form filling in progress...", async () => {
    await pomanager.getregistrationpage().fillregistrationform(...data); //... is a spread operator
  });
  await step("Clicking on Register button...", async () => {
    await pomanager.getregistrationpage().clickonregisterbtn();
  });
  await step("Verifying registration success message...", async () => {
    await expect(
      pomanager.getregistrationpage().successregistrationmessage,
    ).toBeVisible();
  });
  await step("Saving credentials...", async () => {
    testdata.savecredentials(username, password);
  });
});

test("@regressionlogin&openewaccountcheck", async ({ pomanager, testdata }) => {
  const step = createStepLogger();
  let username, password;

  await step("Homepage loading...", async () => {
    await pomanager.gethomepage().goTo();
  });
  await step("Logging in with latest saved credentials...", async () => {
    ({ username, password } = testdata.getlatestcredentials());
    await pomanager.gethomepage().login(username, password);
  });
  await step("Verifying logged in user...", async () => {
    await pomanager.getloggedinpage().loggedinuser();
  });
  await step("Clicking on Open New Account link...", async () => {
    await pomanager.getaccountdetails().clinkonopennewaccountlink();
  });
  await step("Selecting account type...", async () => {
    await pomanager.getaccountdetails().selectaccount();
  });
  await step("Clicking on Open Account button...", async () => {
    await pomanager.getaccountdetails().clickopenaccountbtn();
  });
  await step("Capturing opened account details...", async () => {
    const accountDetails = await pomanager
      .getaccountdetails()
      .getAccountOpenedText();
    console.log(`Account details:\n${accountDetails}`);
    await test.info().attach("account-details", {
      body: accountDetails,
      contentType: "text/plain",
    });
  });
});

test("@regressiontransferfundscheck", async ({ pomanager, testdata }) => {
  const step = createStepLogger();

  await step("Homepage loading...", async () => {
    await pomanager.gethomepage().goTo();
  });
  await step("Logging in with latest saved credentials...", async () => {
    const { username, password } = testdata.getlatestcredentials();
    await pomanager.gethomepage().login(username, password);
  });
  await step("Verifying logged in user...", async () => {
    await pomanager.getloggedinpage().loggedinuser();
  });
  await step("Clicking on Transfer Funds link...", async () => {
    await pomanager.gettransferfunds().clickontransferfundslink();
  });
  await step("Entering transfer amount...", async () => {
    await pomanager.gettransferfunds().amounttextbox("515");
  });
  await step("Clicking on Transfer button...", async () => {
    await pomanager.gettransferfunds().clickontransferbtn();
  });
  await step("Capturing transfer success message...", async () => {
    const transferSuccessMsg = await pomanager
      .gettransferfunds()
      .gettransfersuccessmsg();
    console.log(`Transfer Success Message:\n${transferSuccessMsg}`);
    await test.info().attach("transfer-success-message", {
      body: transferSuccessMsg,
      contentType: "text/plain",
    });
  });
});
