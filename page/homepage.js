export class homepage {
    constructor(page){
        this.page=page
        this.registerationlink = page.getByRole('link', { name: 'Register' })
        this.loginusername = page.locator("//input[@name='username']")
        this.loginpassword = page.locator("//input[@name='password']")

    }

    async goTo(){
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm')
    }

    async clickonregisterlink(){
        await this.registerationlink.click()
    }

    async login(uname,password){
        await this.loginusername.fill(uname)
        await this.loginpassword.fill(password)
    }
}