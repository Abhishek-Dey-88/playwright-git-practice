# ParaBank Basic Operations Test Plan

## Application Overview

Exploration of the ParaBank online banking demo at https://parabank.parasoft.com/parabank/index.htm found public navigation, Customer Login, Register, Forgot login info, account-registration and recovery forms, and an observed invalid-login error. Authenticated banking operations are not accessible from a fresh session without a test account. Execute each authenticated case in an isolated resettable test environment using a disposable synthetic user and known account balances; never use real customer data or real funds. Each scenario starts from a fresh state and is independent. Pass when the stated success/validation outcome appears and account data matches; fail on missing feedback, unintended account changes, or incorrect balances/transactions.

## Test Scenarios

### 1. Public access, registration, and recovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. Reject invalid customer login credentials

**File:** `tests/parabank/public-login-error.spec.ts`

**Steps:**
  1. Start from a fresh logged-out ParaBank home page.
    - expect: The Customer Login form is visible with Username, Password, and Log In controls.
  2. Enter a made-up username and password that are not registered, then select Log In.
    - expect: Sign-in is rejected and the page shows a clear error that the username and password could not be verified.
    - expect: No authenticated navigation or customer account data is shown.

#### 1.2. Show required-field validation for a blank registration

**File:** `tests/parabank/registration-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh logged-out home page and open Register.
    - expect: The registration form is shown with personal information, username, password, and confirmation fields.
  2. Leave every registration field blank and select Register.
    - expect: Required validation messages appear for first name, last name, address, city, state, ZIP code, SSN, username, password, and password confirmation.
    - expect: No account is created.

#### 1.3. Reject registration when password confirmation differs

**File:** `tests/parabank/registration-password-mismatch.spec.ts`

**Steps:**
  1. Start from a fresh state and open Register. Populate all required fields with synthetic test-only values, use a unique username, and enter different values in Password and Confirm.
    - expect: The form accepts the field entries without using real personal or financial data.
  2. Select Register.
    - expect: Registration is rejected with password-mismatch feedback.
    - expect: No account is created and the entered fields remain available for correction.

#### 1.4. Validate required customer lookup fields

**File:** `tests/parabank/account-recovery-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh logged-out home page and open Forgot login info?.
    - expect: Customer Lookup is displayed with first name, last name, address, city, state, ZIP code, and SSN fields, plus Find My Login Info.
  2. Leave all lookup fields blank and select Find My Login Info.
    - expect: Required validation appears for each required lookup field.
    - expect: No credentials or customer information are disclosed.

#### 1.5. Handle a lookup that does not match a customer

**File:** `tests/parabank/account-recovery-no-match.spec.ts`

**Steps:**
  1. Start from a fresh state and open Forgot login info?. Enter synthetically generated details that do not correspond to any test user.
    - expect: The lookup form accepts the values for submission.
  2. Select Find My Login Info.
    - expect: A safe no-match/error response is shown without revealing another customer's credentials or data.

### 2. Authenticated basic banking operations

**Seed:** `tests/seed.spec.ts`

#### 2.1. View account overview and transaction history

**File:** `tests/parabank/account-overview.spec.ts`

**Steps:**
  1. Start with a fresh isolated test user already registered and logged out; ensure the user has at least one account and a known opening balance.
    - expect: The test account exists and its starting balance and transaction history are recorded.
  2. Log in with the test user's valid credentials.
    - expect: A personalized account overview is displayed with account navigation and available banking actions.
  3. Open the account details and transaction history for the seeded account.
    - expect: The account number/type and balance are visible.
    - expect: Transactions are listed with understandable date, description, debit/credit amount, and resulting balance where provided.
    - expect: Displayed figures agree with the seeded test data.

#### 2.2. Open a new account

**File:** `tests/parabank/open-account.spec.ts`

**Steps:**
  1. Start with a fresh isolated logged-in test user that has at least one eligible existing account and sufficient test funds if required.
    - expect: The account overview and Open New Account action are available.
  2. Open the account-opening form and inspect the account-type and source-account controls.
    - expect: Available account types and eligible source accounts are selectable.
    - expect: The form does not default to an invalid or unavailable source account.
  3. Select an available account type and source account, then submit once.
    - expect: A success confirmation and newly created account number are shown.
    - expect: The new account appears in the user's account list and can be opened.
    - expect: The source/new account balances reflect the operation consistently.

#### 2.3. Transfer a valid amount between owned accounts

**File:** `tests/parabank/transfer-funds.spec.ts`

**Steps:**
  1. Start with a fresh isolated logged-in test user with two eligible accounts and record both balances.
    - expect: Both accounts are available for transfer and the starting balances are known.
  2. Open Transfer Funds, select distinct source and destination accounts, enter a positive amount within the source balance, and submit once.
    - expect: A transfer confirmation is displayed.
    - expect: Source balance decreases and destination balance increases by the same amount.
    - expect: A matching transaction is recorded, with no duplicate transfer.

#### 2.4. Reject invalid or unaffordable transfers

**File:** `tests/parabank/transfer-invalid-amounts.spec.ts`

**Steps:**
  1. Start with a fresh isolated logged-in test user with two accounts and record their balances.
    - expect: The accounts and starting balances are available for later comparison.
  2. Attempt a transfer with amount zero, a negative amount, non-numeric text, and an amount greater than the source balance, reloading/resetting the form as needed.
    - expect: Each invalid or unaffordable amount is rejected with clear validation or error feedback.
    - expect: Balances and transaction history remain unchanged after every rejected attempt.
  3. Attempt a transfer from an account to itself if the interface allows that selection.
    - expect: Self-transfer is prevented or rejected and no balance or history changes occur.

#### 2.5. Submit a valid bill payment

**File:** `tests/parabank/bill-pay.spec.ts`

**Steps:**
  1. Start with a fresh isolated logged-in test user with a funded source account.
    - expect: Bill Pay is available and the source account's starting balance is known.
  2. Open Bill Pay and enter synthetic payee name/address details, a valid account reference, a positive payment amount within available funds, and matching account confirmation if requested.
    - expect: All required bill-pay fields are completed with test data only.
  3. Select the funded source account and submit the payment once.
    - expect: A payment confirmation is displayed with the payee and amount.
    - expect: The source balance and transaction history reflect one payment for the submitted amount.

#### 2.6. Validate incomplete and invalid bill payments

**File:** `tests/parabank/bill-pay-validation.spec.ts`

**Steps:**
  1. Start from a fresh isolated logged-in test user and open Bill Pay.
    - expect: The payee details, payment amount, and source-account controls are displayed.
  2. Submit with required fields blank, then retry with a zero, negative, non-numeric, and unaffordable amount using a reset form between attempts.
    - expect: Missing or invalid values produce visible validation/errors.
    - expect: No payment is processed; source balance and history stay unchanged.
  3. Enter different values in any paired account-number confirmation fields and submit.
    - expect: The mismatch is rejected and no bill payment is recorded.

#### 2.7. Filter account activity by date and amount range

**File:** `tests/parabank/activity-filter.spec.ts`

**Steps:**
  1. Start with a fresh isolated logged-in test user whose account history contains transactions on known dates and amounts.
    - expect: The account and known transaction fixtures are available.
  2. Open Find Transactions, select an account, and search using a known transaction ID or description.
    - expect: The matching transaction is returned and its details agree with the fixture.
  3. Search using a valid date range and a valid amount range with known matching and non-matching transactions.
    - expect: Matching transactions appear; transactions outside the selected filter do not.
    - expect: An empty-result search presents a clear empty state without an application error.

#### 2.8. Update customer contact information

**File:** `tests/parabank/update-profile.spec.ts`

**Steps:**
  1. Start with a fresh isolated logged-in test user and record the current profile values.
    - expect: Update Contact Info is available and the profile form is prefilled with the user's current details.
  2. Change one or more editable contact fields to synthetic test values and submit.
    - expect: A success confirmation appears and the changed values are persisted when the profile is reopened.
    - expect: Unchanged fields remain unchanged.
  3. Attempt to submit with required profile fields blank.
    - expect: Required-field feedback appears and invalid profile changes are not saved.

#### 2.9. Log out and prevent access to authenticated pages

**File:** `tests/parabank/logout.spec.ts`

**Steps:**
  1. Start with a fresh isolated logged-in test user.
    - expect: The authenticated navigation includes a Log Out action.
  2. Select Log Out.
    - expect: The user returns to the logged-out home/login experience.
    - expect: Authenticated navigation is no longer available.
  3. Use browser back to revisit an authenticated URL.
    - expect: The protected page does not expose customer data and requires authentication again.
