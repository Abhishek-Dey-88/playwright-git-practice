import { homepage } from "./homepage.js";
import { loggedinpage } from "./loggedinpage.js";
import { registrationpage } from "./registrationpage.js";
import { overviewpage } from "./overviewpage.js";
import { transferfunds } from "./transferfunds.js";
import { billpay } from "./billpay.js";
import { forgotloginpage } from "./forgotloginpage.js";
import { findtransactions } from "./findtransactions.js";

export class POManager {
  constructor(page) {
    this.page = page;
    this.homePage = new homepage(this.page);
    this.registrationPage = new registrationpage(this.page);
    this.loggedinPage = new loggedinpage(this.page);
    this.overviewPage = new overviewpage(this.page);
    this.transferFunds = new transferfunds(this.page);
    this.billPay = new billpay(this.page);
    this.forgotLoginPage = new forgotloginpage(this.page);
    this.findTransactions = new findtransactions(this.page);
  }

  gethomepage() {
    return this.homePage;
  }

  getregistrationpage() {
    return this.registrationPage;
  }

  getloggedinpage() {
    return this.loggedinPage;
  }

  getaccountdetails() {
    return this.overviewPage;
  }

  gettransferfunds() {
    return this.transferFunds;
  }

  getbillpay() {
    return this.billPay;
  }

  getforgotloginpage() {
    return this.forgotLoginPage;
  }

  getfindtransactions() {
    return this.findTransactions;
  }
}
