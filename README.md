# Playwright Git Practice

A Playwright-based end-to-end automation project built for practicing Git workflows and browser test automation. The project uses the Page Object Model (POM) pattern and targets the ParaBank demo application to cover user registration, login, account creation, money transfers, bill payments, and validation scenarios.

## Overview

This repository demonstrates:

- Playwright automation with JavaScript
- Page Object Model design
- Reusable fixtures for test data and page management
- Regression-style E2E test coverage
- Allure reporting support
- Browser-based validation using ParaBank

## Tech Stack

- JavaScript
- Playwright
- Allure Playwright
- Faker.js
- Node.js

## Project Structure

```text
playwright-git-practice/
├── .github/                 # GitHub-related workflow/config files
├── .codex/                  # Codex related metadata
├── .playwright-mcp/         # Playwright MCP setup files
├── .vscode/                # VS Code workspace settings
├── allure-report/          # Generated Allure HTML report
├── allure-results/         # Raw Allure test results
├── fixture/                # Reusable Playwright test fixtures
│   └── testfixtures.js
├── page/                   # Page Object classes
│   ├── POManager.js
│   ├── billpay.js
│   ├── forgotloginpage.js
│   ├── homepage.js
│   ├── loggedinpage.js
│   ├── overviewpage.js
│   ├── registrationpage.js
│   └── transferfunds.js
├── specs/                  # Test specification folders
├── test-plans/             # Manual or structured test plans
├── tests/                  # Playwright test specs
│   ├── e2etestscripts.spec.js
│   └── old_e2etestscripts.spec.js
├── utils/                  # Helper logic
│   ├── datagenerator.js
│   ├── steps.js
│   └── ...
├── .gitignore
├── .mcp.json
├── package.json
├── playwright.config.js
├── playwright.human.config.js
├── package-lock.json
└── README.md
```

## Features

- Registration flow validation
- Invalid login validation
- Forgot login info validation
- New account creation
- Funds transfer flow
- Bill payment flow
- Reusable test data generation
- Step-level logging for better debugging
- Allure + HTML reporting

## Prerequisites

Before running the tests, make sure you have:

- Node.js installed
- npm installed
- A browser engine available for Playwright
- Internet access to access the ParaBank app

## Installation

```bash
git clone https://github.com/Abhishek-Dey-88/playwright-git-practice.git
cd playwright-git-practice
npm install
npx playwright install
```

## Running Tests

Run the default suite:

```bash
npm test
```

Run with a human-style config:

```bash
npm run test:human
```

Run tagged test groups:

```bash
npm run smoke
npm run regression
npm run sanity
```

## Available Scripts

From `package.json`:

```json
"scripts": {
  "test": "npx playwright test --project=chrome",
  "test:human": "npx playwright test --project=chrome --config=playwright.human.config.js",
  "build": "npx playwright install --with-deps && npx playwright test",
  "smoke": "npx playwright test --grep @smoke --project=chrome",
  "regression": "npx playwright test --grep @regression --project=chrome",
  "sanity": "npx playwright test --grep @sanity --project=chrome",
  "allure:generate": "npx -y allure-commandline generate allure-results --clean -o allure-report",
  "allure:open": "npx -y allure-commandline open allure-report"
}
```

## Test Configuration

The project uses Playwright config with:

- Chromium project setup
- Base URL: `https://parabank.parasoft.com/parabank/`
- HTML reporter
- Allure reporter
- Local video capture
- Trace collection on retry

## Example Test Coverage

The current suite includes scenarios such as:

- User registration
- Login after registration
- Open new account
- Transfer funds
- Bill pay
- Invalid login attempt
- Required field validation checks

## Reporting

Generate and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

HTML reports are also generated automatically by Playwright.

## Notes

- The project follows a structured automation approach with reusable page objects.
- Test data is generated dynamically to reduce dependency on static credentials.
- The repo is suitable for practicing Git-based automation and browser testing workflows.

## License

This project is currently using the ISC license as defined in `package.json`.

## Contributing

Feel free to fork the repository and add more scenarios, improve the page object layer, or extend the test suite.

## Author

Abhishek Dey
