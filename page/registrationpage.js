export class registrationpage {
  constructor(page) {
    this.page = page;
    this.firstname = page.locator(
      `//tr[td[contains(., 'First Name:')]]//input[@type='text']`,
    );
    this.lastname = page.locator(
      `//tr[td[contains(., 'Last Name:')]]//input[@type='text']`,
    );
    this.address = page.locator(
      `//tr[td[contains(., 'Address:')]]//input[@type='text']`,
    );
    this.city = page.locator(
      `//tr[td[contains(., 'City:')]]//input[@type='text']`,
    );
    this.state = page.locator(
      `//tr[td[contains(., 'State:')]]//input[@type='text']`,
    );
    this.zipcode = page.locator(
      `//tr[td[contains(., 'Zip Code:')]]//input[@type='text']`,
    );
    this.phonenumber = page.locator(
      `//tr[td[contains(., 'Phone #:')]]//input[@type='text']`,
    );
    this.SSN = page.locator(
      `//tr[td[contains(., 'SSN:')]]//input[@type='text']`,
    );
    this.username = page.locator(
      `//tr[td[contains(., 'Username:')]]//input[@type='text']`,
    );
    this.password = page.locator(
      `//tr[td[contains(., 'Password:')]]//input[@type='password']`,
    );
    this.confirmpassword = page.locator(
      `//tr[td[contains(., 'Confirm:')]]//input[@type='password']`,
    );
    this.registerbtn = page.locator("//input[@value='Register']");
    this.successregistrationmessage = page.getByText(
      "Your account was created successfully. You are now logged in.",
      { exact: true },
    );
  }

  async fillregistrationform(
    fname,
    lname,
    addr,
    city,
    state,
    zip,
    phone,
    ssn,
    uname,
    password,
  ) {
    await this.firstname.fill(fname);
    await this.lastname.fill(lname);
    await this.address.fill(addr);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.zipcode.fill(zip);
    await this.phonenumber.fill(phone);
    await this.SSN.fill(ssn);
    await this.username.fill(uname);
    await this.password.fill(password);
    await this.confirmpassword.fill(password);
  }

  async clickonregisterbtn() {
    await this.registerbtn.click();
  }
}
