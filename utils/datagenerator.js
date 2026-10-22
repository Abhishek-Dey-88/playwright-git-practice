import { faker } from "@faker-js/faker";

export class test_Data {
  datafiller() {
    // Random suffix keeps usernames unique when parallel workers register in the same
    // millisecond; timestamp is trimmed so the length stays as before (19 chars)
    const username = `Tester${String(Date.now()).slice(-9)}${faker.string.numeric(4)}`;
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
      username: `qa_invalid_user_${String(Date.now()).slice(-9)}${faker.string.numeric(4)}`,
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
