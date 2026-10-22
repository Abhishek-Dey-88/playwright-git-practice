export class billpay {
  constructor(page) {
    this.page = page;
    this.billpaylink = page.getByRole("link", { name: "Bill Pay" });
    // Bill Pay inputs have no labels/ids, so the stable `name` attributes are used
    this.payeename = page.locator("input[name='payee.name']");
    this.address = page.locator("input[name='payee.address.street']");
    this.city = page.locator("input[name='payee.address.city']");
    this.state = page.locator("input[name='payee.address.state']");
    this.zipcode = page.locator("input[name='payee.address.zipCode']");
    this.phonenumber = page.locator("input[name='payee.phoneNumber']");
    this.accountnumber = page.locator("input[name='payee.accountNumber']");
    this.verifyaccountnumber = page.locator("input[name='verifyAccount']");
    this.amount = page.locator("input[name='amount']");
    this.fromaccountoptions = page.locator("select[name='fromAccountId'] option");
    this.sendpaymentbtn = page.getByRole("button", { name: "Send Payment" });
    this.paymentresult = page.locator("#billpayResult");
  }

  async clickonbillpaylink() {
    await this.billpaylink.click();
  }

  async fillpayeedetails(payee) {
    await this.payeename.fill(payee.name);
    await this.address.fill(payee.address);
    await this.city.fill(payee.city);
    await this.state.fill(payee.state);
    await this.zipcode.fill(payee.zipcode);
    await this.phonenumber.fill(payee.phonenumber);
    await this.accountnumber.fill(payee.accountnumber);
    await this.verifyaccountnumber.fill(payee.accountnumber);
  }

  async enteramount(amount) {
    await this.amount.fill(amount);
  }

  async clickonsendpayment() {
    // "from account" options load asynchronously; submitting earlier sends nothing
    await this.fromaccountoptions.first().waitFor({ state: "attached" });
    await this.sendpaymentbtn.click();
  }

  async getpaymentresulttext() {
    await this.paymentresult.waitFor();
    return (await this.paymentresult.innerText()).trim();
  }
}
