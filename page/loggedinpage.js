import { expect } from "@playwright/test";

export class loggedinpage {
  constructor(page) {
    this.page = page;
    this.userloggedcheck = page.getByRole("heading", {
      name: "Accounts Overview",
    });
  }

  async loggedinuser() {
    await expect(this.userloggedcheck).toBeVisible();
  }
}
