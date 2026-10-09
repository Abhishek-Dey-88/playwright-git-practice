import { test, expect } from '@playwright/test';

export const customtest = test.extend(
    {
  testdataForregistration: 
  {
    firstname: "Testers",
    lastname: "Talk",
    city: "San Jose",
    address: "address1",
    state: "California",
    zipcode: "12345",
    phonenumber: "1234567898",
    ssn: "1234512345",
    username: "Testers",
    password: "1234567891",
    confirmpassword: "1234567891"
  }
});

export { expect };