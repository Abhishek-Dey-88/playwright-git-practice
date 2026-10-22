# Playwright Git Practice

A practical Playwright automation project designed for Git practice and browser-based end-to-end testing. This repository demonstrates how to structure automated UI tests with the Page Object Model (POM), reusable fixtures, and quality reporting using Playwright and Allure.

## Overview

This project targets the ParaBank demo application and covers common web flows such as:

- User registration
- Valid and invalid login scenarios
- Password recovery / forgot login
- Account creation
- Funds transfer
- Bill payment
- Field validation checks

## Tech Stack

- JavaScript
- Playwright
- Node.js
- Faker.js
- Allure Playwright

## Repository Structure

```text
playwright-git-practice/
├── .github/                 # GitHub-related configuration
├── .codex/                 # Project metadata/configuration
├── .playwright-mcp/         # Playwright MCP setup files
├── .vscode/                # Editor settings
├── allure-report/          # Generated HTML report
├── allure-results/         # Raw Allure results
├── fixture/                # Playwright fixtures
│   └── testfixtures.js
├── page/                   # Page Object Model files
│   ├── POManager.js
│   ├── billpay.js
│   ├── forgotloginpage.js
│   ├── homepage.js
│   ├── loggedinpage.js
│   ├── overviewpage.js
│   ├── registrationpage.js
│   └── transferfunds.js
├── specs/                  # Additional test specs
├── test-plans/             # Test planning artifacts
├── tests/                  # Playwright test suite
│   ├── e2etestscripts.spec.js
│   └── old_e2etestscripts.spec.js
├── utils/                  # Shared helpers and utilities
│   ├── datagenerator.js
│   ├── steps.js
│   └── ...
├── .gitignore
├── .mcp.json
├── package.json
├── playwright.config.js
├── playwright.human.config.js
├── package-lock.json
├── README.md
└── LICENSE (if present)
```

## Prerequisites

Before running the project, ensure you have:

- Node.js installed
- npm installed
- Playwright browser dependencies installed
- Access to the internet for the ParaBank demo site

## Installation

```bash
git clone https://github.com/Abhishek-Dey-88/playwright-git-practice.git
cd playwright-git-practice
npm install
npx playwright install
```

## Run Tests

Run the default suite:

```bash
npm test
```

Run the human-style configuration:

```bash
npm run test:human
```

Run specific test groups:

```bash
npm run smoke
npm run regression
npm run sanity
```

## Available Scripts

The project includes the following scripts in `package.json`:

```json
{
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
}
```

## Reporting

This project is configured to generate:

- Playwright HTML report
- Allure report for richer test reporting

Generate the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

## Configuration

The Playwright config is defined in `playwright.config.js` and includes:

- Chromium browser project setup
- Base URL for ParaBank
- HTML reporter
- Allure reporter
- Video capture
- Retry and failure tracing support

## Example Test Coverage

The current automated suite includes scenarios for:

- Registration success
- Login success and logout flow
- Opening a new account
- Transfer funds
- Bill payment
- Invalid login errors
- Required field validation

## Notes

- Tests are built using reusable page objects for maintainability.
- Data generation is handled dynamically to keep the suite realistic and isolated.
- The project is a good example of practicing Git workflows alongside software testing automation.

## License

This project is currently licensed under the ISC license as declared in `package.json`.

## Author

Abhishek Dey
