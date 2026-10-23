export class findtransactions {
  constructor(page) {
    this.page = page;
    this.findtransactionslink = page.getByRole("link", { name: "Find Transactions" });
    this.accountoptions = page.locator("#accountId option");
    this.amountinput = page.locator("#amount");
    this.findbyamountbtn = page.locator("#findByAmount");
    this.resultheading = page.getByRole("heading", { name: "Transaction Results" });
    this.transactionrows = page.locator("#transactionBody tr");
  }

  async clickonfindtransactionslink() {
    await this.findtransactionslink.click();
  }

  async findbyamount(amount) {
    // account options load asynchronously; searching earlier sends no account
    await this.accountoptions.first().waitFor({ state: "attached" });
    await this.amountinput.fill(amount);
    await this.findbyamountbtn.click();
  }

  // result row whose Transaction column contains the given description
  gettransactionrow(description) {
    return this.transactionrows.filter({ hasText: description });
  }
}
