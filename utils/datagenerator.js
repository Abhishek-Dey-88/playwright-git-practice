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
}
