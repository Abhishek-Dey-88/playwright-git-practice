import { customtest as test, expect } from "../fixture/testfixtures.js";
import { createStepLogger } from "../utils/steps.js";

// Tests are independent: the registeredUser fixture creates a fresh ParaBank user
// per test, so no shared credentials file or serial ordering is needed.

test("@regressionbankregistartioncheck", async ({ pomanager, testdata }) => {
  const step = createStepLogger();
  const data = testdata.datafiller();

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
});

test("@regressionlogin&openewaccountcheck", async ({
  pomanager,
  registeredUser,
}) => {
  const step = createStepLogger();

  await step("Logging out the freshly registered user...", async () => {
    await pomanager.getloggedinpage().logout();
  });
  await step("Logging in with the registered credentials...", async () => {
    await pomanager
      .gethomepage()
      .login(registeredUser.username, registeredUser.password);
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
  await step("Verifying opened account details...", async () => {
    const accountDetails = await pomanager
      .getaccountdetails()
      .getAccountOpenedText();
    console.log(`Account details:\n${accountDetails}`);
    await test.info().attach("account-details", {
      body: accountDetails,
      contentType: "text/plain",
    });
    expect(accountDetails).toContain("Account Opened!");
    await expect(pomanager.getaccountdetails().newaccountid).toHaveText(/\d+/);
  });
});

test("@regressiontransferfundscheck", async ({ pomanager, registeredUser }) => {
  const step = createStepLogger();

  await step("Verifying user is logged in after registration...", async () => {
    await expect(pomanager.getloggedinpage().logoutlink).toBeVisible();
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
  await step("Verifying transfer success message...", async () => {
    const transferSuccessMsg = await pomanager
      .gettransferfunds()
      .gettransfersuccessmsg();
    console.log(`Transfer Success Message:\n${transferSuccessMsg}`);
    await test.info().attach("transfer-success-message", {
      body: transferSuccessMsg,
      contentType: "text/plain",
    });
    expect(transferSuccessMsg).toContain("Transfer Complete!");
    expect(transferSuccessMsg).toContain("$515.00 has been transferred");
  });
});

test("@regressionbillpaycheck", async ({
  pomanager,
  testdata,
  registeredUser,
}) => {
  const step = createStepLogger();
  const { payee, amount } = testdata.billpaydata();

  await step("Verifying user is logged in after registration...", async () => {
    await expect(pomanager.getloggedinpage().logoutlink).toBeVisible();
  });
  await step("Clicking on Bill Pay link...", async () => {
    await pomanager.getbillpay().clickonbillpaylink();
  });
  await step("Filling payee details...", async () => {
    await pomanager.getbillpay().fillpayeedetails(payee);
  });
  await step("Entering payment amount...", async () => {
    await pomanager.getbillpay().enteramount(amount);
  });
  await step("Clicking on Send Payment button...", async () => {
    await pomanager.getbillpay().clickonsendpayment();
  });
  await step("Verifying bill payment result...", async () => {
    const paymentResult = await pomanager.getbillpay().getpaymentresulttext();
    console.log(`Bill Payment Result:\n${paymentResult}`);
    await test.info().attach("bill-payment-result", {
      body: paymentResult,
      contentType: "text/plain",
    });
    expect(paymentResult).toContain("Bill Payment Complete");
    expect(paymentResult).toContain(
      `Bill Payment to ${payee.name} in the amount of $${amount}.00`,
    );
    expect(paymentResult).toContain("was successful");
  });
});

test("@regressioninvalidlogincheck", async ({ pomanager, testdata }) => {
  const step = createStepLogger();
  const { username, password } = testdata.invalidlogindata();

  await step("Homepage loading...", async () => {
    await pomanager.gethomepage().goTo();
  });
  await step("Logging in with unregistered credentials...", async () => {
    await pomanager.gethomepage().login(username, password);
  });
  await step("Verifying login is rejected with an error...", async () => {
    await expect(pomanager.gethomepage().loginerrorheading).toBeVisible();
    await expect(pomanager.gethomepage().loginerrormessage).toBeVisible();
  });
  await step("Verifying no authenticated navigation is shown...", async () => {
    await expect(pomanager.getloggedinpage().logoutlink).toHaveCount(0);
  });
});

test("@regressionregistrationrequiredfieldscheck", async ({ pomanager }) => {
  const step = createStepLogger();

  await step("Homepage loading...", async () => {
    await pomanager.gethomepage().goTo();
  });
  await step("Clicking on Register link...", async () => {
    await pomanager.gethomepage().clickonregisterlink();
  });
  await step("Clicking on Register button with every field blank...", async () => {
    await pomanager.getregistrationpage().clickonregisterbtn();
  });
  await step("Verifying required-field validation messages...", async () => {
    for (const error of pomanager.getregistrationpage().getrequiredfielderrors()) {
      await expect(error).toBeVisible();
    }
  });
  await step("Verifying no account is created...", async () => {
    await expect(pomanager.getregistrationpage().signupheading).toBeVisible();
    await expect(pomanager.getloggedinpage().logoutlink).toHaveCount(0);
  });
});

test("@regressionaccountrecoveryrequiredfieldscheck", async ({ pomanager }) => {
  const step = createStepLogger();

  await step("Homepage loading...", async () => {
    await pomanager.gethomepage().goTo();
  });
  await step("Clicking on Forgot login info link...", async () => {
    await pomanager.gethomepage().clickonforgotlogininfolink();
  });
  await step("Clicking on Find My Login Info button with every field blank...", async () => {
    await pomanager.getforgotloginpage().clickonfindlogininfobtn();
  });
  await step("Verifying required-field validation messages...", async () => {
    for (const error of pomanager.getforgotloginpage().getrequiredfielderrors()) {
      await expect(error).toBeVisible();
    }
  });
  await step("Verifying no customer information is disclosed...", async () => {
    await expect(pomanager.getforgotloginpage().customerlookupheading).toBeVisible();
    await expect(pomanager.getforgotloginpage().customerinfoheading).toHaveCount(0);
  });
});
