export class homepage {
  constructor(page) {
    this.page = page;
    this.registerationlink = page.getByRole("link", { name: "Register" });
    this.loginusername = page.locator("//input[@name='username']");
    this.loginpassword = page.locator("//input[@name='password']");
    this.loginbtn = page.getByRole("button", { name: "Log In" });
    this.forgotlogininfolink = page.getByRole("link", { name: "Forgot login info?" });
    this.loginerrorheading = page.getByRole("heading", { name: "Error!" });
    this.loginerrormessage = page.getByText(
      "The username and password could not be verified.",
      { exact: true },
    );
  }

  async goTo() {
    await this.page.goto("index.htm"); // resolved against baseURL in playwright.config.js
  }

  async clickonregisterlink() {
    await this.registerationlink.click();
  }

  async clickonforgotlogininfolink() {
    await this.forgotlogininfolink.click();
  }

  async login(uname, password) {
    await this.loginusername.fill(uname);
    await this.loginpassword.fill(password);
    await this.loginbtn.click();
  }
}
