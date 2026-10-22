# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: old_e2etestscripts.spec.js >> @regressionbankregistartioncheck
- Location: tests\old_e2etestscripts.spec.js:5:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Your account was created successfully. You are now logged in.', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Your account was created successfully. You are now logged in.', { exact: true }) with timeout 5000ms
  - waiting for getByText('Your account was created successfully. You are now logged in.', { exact: true })

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- heading "Customer Login" [level=2]
- paragraph: Username
- textbox
- paragraph: Password
- textbox
- button "Log In"
- paragraph:
  - link "Forgot login info?":
    - /url: lookup.htm
- paragraph:
  - link "Register":
    - /url: register.htm
- heading "Signing up is easy!" [level=1]
- paragraph: If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
- table:
  - rowgroup:
    - 'row "First Name: Nora"':
      - cell "First Name:"
      - cell "Nora":
        - textbox: Nora
      - cell
    - 'row "Last Name: Schmeler"':
      - cell "Last Name:"
      - cell "Schmeler":
        - textbox: Schmeler
      - cell
    - 'row "Address: 10099 Hester Throughway"':
      - cell "Address:"
      - cell "10099 Hester Throughway":
        - textbox: 10099 Hester Throughway
      - cell
    - 'row "City: Olympia"':
      - cell "City:"
      - cell "Olympia":
        - textbox: Olympia
      - cell
    - 'row "State: Maryland"':
      - cell "State:"
      - cell "Maryland":
        - textbox: Maryland
      - cell
    - 'row "Zip Code: 37956"':
      - cell "Zip Code:"
      - cell "37956":
        - textbox: "37956"
      - cell
    - 'row "Phone #: 9903536443"':
      - 'cell "Phone #:"'
      - cell "9903536443":
        - textbox: "9903536443"
      - cell
    - 'row "SSN: 754456757"':
      - cell "SSN:"
      - cell "754456757":
        - textbox: "754456757"
      - cell
    - row:
      - cell
    - 'row "Username: Tester1791952079738 This username already exists."':
      - cell "Username:"
      - cell "Tester1791952079738":
        - textbox: Tester1791952079738
      - cell "This username already exists."
    - row "Password:":
      - cell "Password:"
      - cell:
        - textbox
      - cell
    - row "Confirm:":
      - cell "Confirm:"
      - cell:
        - textbox
      - cell
    - row "Register":
      - cell
      - cell "Register":
        - button "Register"
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { customtest as test, expect } from "../fixture/testfixtures.js";
  2  | 
  3  | test.describe.configure({ mode: "serial" });
  4  | 
  5  | test("@regressionbankregistartioncheck", async ({ pomanager, testdata }) => {
  6  |   const data = testdata.datafiller();
  7  |   const [username, password] = data.slice(8);
  8  | 
  9  |   await pomanager.gethomepage().goTo();
  10 |   await pomanager.gethomepage().clickonregisterlink();
  11 |   await pomanager.getregistrationpage().fillregistrationform(...data); //... is a spread operator
  12 |   await pomanager.getregistrationpage().clickonregisterbtn();
  13 |   await expect(
  14 |     pomanager.getregistrationpage().successregistrationmessage,
> 15 |   ).toBeVisible();
     |     ^ Error: expect(locator).toBeVisible() failed
  16 | 
  17 |   testdata.savecredentials(username, password);
  18 | });
  19 | 
  20 | /*
  21 | for (const data of testData)
  22 | {
  23 | 
  24 | test(`datadriventc ${data.username}`, async ({ page }) => {
  25 | 
  26 |   const username =  `${data.username}${Date.now()}`;
  27 | 
  28 |   const pomanager = new POManager(page)
  29 |   const homepage = pomanager.gethomepage()
  30 |   const registrationPage = pomanager.getregistrationpage()
  31 | 
  32 |   await homepage.goTo();
  33 |   await homepage.clickonregisterlink();
  34 |   await registrationPage.fillregistrationform(
  35 |     data.firstname,
  36 |     data.lastname,
  37 |     data.address,
  38 |     data.city,
  39 |     data.state,
  40 |     data.zipcode,
  41 |     data.phonenumber,
  42 |     data.ssn,
  43 |     username,
  44 |     data.password
  45 | );
  46 |   await registrationPage.clickonregisterbtn();
  47 |   // await page.waitForTimeout(2000);
  48 | 
  49 |   // await expect(registrationPage.successregistrationmessage).toBeVisible();
  50 | })
  51 | };
  52 | 
  53 | 
  54 | ctest.("bankregistartion with fixtureS",async ({ page, testdataForregistration }) => {
  55 |   const pomanager = new POManager(page);
  56 |   const homepage = pomanager.gethomepage();
  57 |   const registrationPage = pomanager.getregistrationpage();
  58 | 
  59 |   await homepage.goTo();
  60 |   await homepage.clickonregisterlink();
  61 |   await registrationPage.fillregistrationform(
  62 |     testdataForregistration.firstname,
  63 |     testdataForregistration.lastname,
  64 |     testdataForregistration.address,
  65 |     testdataForregistration.city,
  66 |     testdataForregistration.state,
  67 |     testdataForregistration.zipcode,
  68 |     testdataForregistration.phonenumber,
  69 |     testdataForregistration.ssn,
  70 |     testdataForregistration.username,
  71 |     testdataForregistration.password,
  72 |   );
  73 |   await registrationPage.clickonregisterbtn();
  74 |   // await page.waitForTimeout(2000);
  75 | 
  76 |   // await expect(registrationPage.successregistrationmessage).toBeVisible();
  77 | });
  78 | 
  79 | */
  80 | 
  81 | test("@regressionlogin&openewaccountcheck", async ({ pomanager, testdata }) => {
  82 |   await pomanager.gethomepage().goTo();
  83 |   const { username, password } = testdata.getlatestcredentials();
  84 |   await pomanager.gethomepage().login(username, password);
  85 |   await pomanager.getloggedinpage().loggedinuser();
  86 |   await pomanager.getaccountdetails().clinkonopennewaccountlink();
  87 |   await pomanager.getaccountdetails().selectaccount();
  88 |   await pomanager.getaccountdetails().clickopenaccountbtn();
  89 |   const accountDetails = await pomanager
  90 |     .getaccountdetails()
  91 |     .getAccountOpenedText();
  92 |   console.log(`Account details:\n${accountDetails}`);
  93 |   await test.info().attach("account-details", {
  94 |     body: accountDetails,
  95 |     contentType: "text/plain",
  96 |   });
  97 | });
  98 | 
```