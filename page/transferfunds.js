import { expect } from "@playwright/test";

export class transferfunds{
constructor(page){
    this.page=page
    this.transferfundslink = page.getByRole('link', { name: 'Transfer Funds' }) ;
    this.amountinputbox = page.locator('#amount');
    this.transferbtn = page.getByRole('button', { name: 'Transfer' });
    this.fromaccountoptions = page.locator('#fromAccountId option');
    this.transfersuccessmsg= page.locator('#showResult');
}

async clickontransferfundslink(){
    await this.transferfundslink.click()
}

async amounttextbox(amount){
    await this.amountinputbox.fill(amount)
}

async clickontransferbtn(){
    // account dropdown options load asynchronously; submitting earlier transfers nothing
    await expect(this.fromaccountoptions.first()).toBeAttached()
    await this.transferbtn.click()
}
async gettransfersuccessmsg(){
    await this.transfersuccessmsg.waitFor();
    return (await this.transfersuccessmsg.textContent()).trim();
}
}