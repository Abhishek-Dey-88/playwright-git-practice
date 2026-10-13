import { expect } from "@playwright/test";

export class overviewpage {
  constructor(page) {
    this.page = page;
    this.newaccountlinktext = page.locator('a:has-text("Open New Account")');
    this.accounttypedropdown = page.locator("#type");
    this.opennewaccountbtn = page.locator("input.button");
    this.newaccountcheck = page.locator("#openAccountResult");
    this.newaccountid = page.locator("#newAccountId");
  }

  async loggedinuser() {
    await expect(this.userloggedcheck).toBeVisible();
  }

  async clinkonopennewaccountlink() {
    await this.newaccountlinktext.click();
  }

  async selectaccount() {
    await this.accounttypedropdown.selectOption({ label: "SAVINGS" });
  }

  async clickopenaccountbtn() {
    await this.opennewaccountbtn.click();
  }

  async getAccountOpenedText() {
    await this.newaccountcheck.waitFor();
    return (await this.newaccountcheck.textContent()).trim();
  }
}
