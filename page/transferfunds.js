import { expect } from "@playwright/test";

export class transferfunds{
constructor(page){
    this.page=page
    this.transferfundslink = page.getByRole('link', { name: 'Transfer Funds' }) ;
    this.amountinputbox = page.getByRole('textbox');
    this.tansferbtn = page.getByRole('button');
    this.transfersuccessmsg= page.locator('#showResult');
}

async clickontransferfundslink(){
    await this.transferfundslink.click()
}

async amounttextbox(amount){
    await this.amountinputbox.fill(amount)
}

async clickontransferbtn(){
    await this.tansferbtn.click()
}
async gettransfersuccessmsg(){
    const transferSuccessMsg = await this.transfersuccessmsg.textContent();
    await expect(this.transfersuccessmsg).toContainText('Transfer Complete!')
    return transferSuccessMsg;
}
}