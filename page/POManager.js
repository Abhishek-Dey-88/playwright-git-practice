import {homepage} from './homepage.js'
import {registrationpage} from './registrationpage.js'

export class POManager{
    constructor(page)
    {
        this.page = page
        this.homePage = new homepage(this.page)
        this.registrationPage = new registrationpage(this.page)   
    }

    gethomepage(){
        return this.homePage
    }

    getregistrationpage(){
        return this.registrationPage
    }
}