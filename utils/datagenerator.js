import { faker } from "@faker-js/faker";
import fs from "fs";

const CRED_FILE = "utils/credentials.json";

export class test_Data {
  // append a registered user to the history file
  savecredentials(username, password) {
    let saved = [];
    try {
      const existing = JSON.parse(fs.readFileSync(CRED_FILE, "utf-8"));
      saved = Array.isArray(existing) ? existing : [existing]; // old file held a single object
    } catch {
      // file missing or empty -> start a new list
    }
    saved.push({ username, password });
    fs.writeFileSync(CRED_FILE, JSON.stringify(saved, null, 2));
  }

  // latest registered user only
  getlatestcredentials() {
    const saved = JSON.parse(fs.readFileSync(CRED_FILE, "utf-8"));
    return saved.at(-1);
  }
  datafiller() {
    const username = `Tester${Date.now()}`;
    const password = faker.internet.password();

    // Order must match fillregistrationform(fname, lname, addr, city, state, zip, phone, ssn, uname, password)
    return [
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.streetAddress(),
      faker.location.city(),
      faker.location.state(),
      faker.location.zipCode(),
      faker.string.numeric(10),
      faker.string.numeric(9),
      username,
      password,
    ];
  }

  // Made-up credentials that are never registered (for the invalid-login check)
  invalidlogindata() {
    return {
      username: `qa_invalid_user_${Date.now()}`,
      password: faker.internet.password(),
    };
  }

  // Payee + whole-dollar amount for the Bill Pay form (see billpay.fillpayeedetails)
  billpaydata() {
    return {
      payee: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipcode: faker.location.zipCode(),
        phonenumber: faker.string.numeric(10),
        accountnumber: faker.string.numeric(8),
      },
      amount: String(faker.number.int({ min: 1, max: 100 })),
    };
  }
}
