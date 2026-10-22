import { expect } from "@playwright/test";

export class loggedinpage {
  constructor(page) {
    this.page = page;
    this.userloggedcheck = page.getByRole("heading", {
      name: "Accounts Overview",
    });
    this.logoutlink = page.getByRole("link", { name: "Log Out" });
  }

  async logout() {
    await this.logoutlink.click();
  }

  async loggedinuser() {
    await expect(this.userloggedcheck).toBeVisible();
  }
}
