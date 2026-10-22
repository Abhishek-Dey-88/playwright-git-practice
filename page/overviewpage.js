import { expect } from "@playwright/test";

export class overviewpage {
  constructor(page) {
    this.page = page;
    this.newaccountlinktext = page.getByRole("link", { name: "Open New Account" });
    this.accounttypedropdown = page.locator("#type");
    this.opennewaccountbtn = page.getByRole("button", { name: "Open New Account" });
    this.newaccountcheck = page.locator("#openAccountResult");
    this.newaccountid = page.locator("#newAccountId");
    this.fromaccountoptions = page.locator("#fromAccountId option");
  }

  async clinkonopennewaccountlink() {
    await this.newaccountlinktext.click();
  }

  async selectaccount(type = "SAVINGS") {
    await this.accounttypedropdown.selectOption({ label: type });
  }

  async clickopenaccountbtn() {
    // "from account" options load asynchronously; submitting earlier opens nothing
    await expect(this.fromaccountoptions.first()).toBeAttached();
    await this.opennewaccountbtn.click();
  }

  async getAccountOpenedText() {
    await this.newaccountcheck.waitFor();
    return (await this.newaccountcheck.textContent()).trim();
  }
}
