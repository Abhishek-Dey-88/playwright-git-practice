export class forgotloginpage {
  constructor(page) {
    this.page = page;
    this.findlogininfobtn = page.getByRole("button", { name: "Find My Login Info" });
    this.customerlookupheading = page.getByRole("heading", { name: "Customer Lookup" });
    this.customerinfoheading = page.getByRole("heading", { name: "Customer Information" });
    this.requiredfieldmessages = [
      "First name is required.",
      "Last name is required.",
      "Address is required.",
      "City is required.",
      "State is required.",
      "Zip Code is required.",
      "Social Security Number is required.",
    ];
  }

  async clickonfindlogininfobtn() {
    await this.findlogininfobtn.click();
  }

  // one locator per expected validation message, in the order listed above
  getrequiredfielderrors() {
    return this.requiredfieldmessages.map((message) =>
      this.page.getByText(message, { exact: true }),
    );
  }
}
