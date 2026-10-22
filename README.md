![GitHub Repo stars](https://img.shields.io/github/stars/Abhishek-Dey-88/playwright-git-practice?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Abhishek-Dey-88/playwright-git-practice?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/Abhishek-Dey-88/playwright-git-practice?style=for-the-badge)
![Playwright](https://img.shields.io/badge/Playwright-%E2%9C%93-45BA4B?style=for-the-badge&logo=playwright)

# Playwright Git Practice

A focused Playwright automation project built for practicing Git workflows and browser-based end-to-end testing. The repository demonstrates a clean automation structure with reusable page objects, fixtures, data generation, and test reporting.

## Overview

This project is designed to validate real-world web application flows against the ParaBank demo site. It covers the most common UI regression paths and follows a maintainable test architecture that is easy to extend.

## Key Features

- End-to-end testing with Playwright
- Page Object Model (POM) implementation
- Reusable test fixtures and utilities
- Dynamic test data generation
- Regression-style test coverage
- Step-level logging for better debugging
- HTML and Allure reporting
- Browser automation for login, registration, transfers, and bill payment flows

## Tech Stack

- JavaScript
- Playwright
- Node.js
- Faker.js
- Allure Playwright

## Project Structure

```text
playwright-git-practice/
├── .github/                 # GitHub-related configuration
├── .codex/                  # Project metadata/configuration
├── .playwright-mcp/         # Playwright MCP setup files
├── .vscode/                 # VS Code workspace settings
├── allure-report/           # Generated HTML report
├── allure-results/          # Raw Allure test results
├── fixture/
│   └── testfixtures.js     # Reusable Playwright test fixtures
├── page/
│   ├── POManager.js         # Central page object manager
│   ├── billpay.js           # Bill pay page object
│   ├── forgotloginpage.js  # Forgot login page object
│   ├── homepage.js          # Homepage page object
│   ├── loggedinpage.js      # Logged-in page object
│   ├── overviewpage.js      # Account overview page object
│   ├── registrationpage.js  # Registration page object
│   └── transferfunds.js     # Transfer funds page object
├── specs/                   # Additional specs folder
├── test-plans/              # Test planning files
├── tests/
│   ├── e2etestscripts.spec.js
│   └── old_e2etestscripts.spec.js
├── utils/
│   ├── datagenerator.js     # Fake user and data generation
│   ├── steps.js             # Step logger utility
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

Make sure you have the following installed on your machine:

- Node.js
- npm
- Playwright browser dependencies
- Internet access for the demo application

## Installation

```bash
git clone https://github.com/Abhishek-Dey-88/playwright-git-practice.git
cd playwright-git-practice
npm install
npx playwright install
```

## Running the Tests

Run the full default suite:

```bash
npm test
```

Run the human-style configuration:

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

## Test Coverage

The suite currently includes checks for:

- Registration flow
- Invalid login handling
- Forgot login validation
- Account creation
- Transfer funds
- Bill payment
- Required field validation

## Reporting

This project is configured to generate both HTML and Allure reports.

Generate the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

## Configuration

The project uses `playwright.config.js` with:

- Chromium project setup
- Base URL pointing to ParaBank
- HTML reporter
- Allure reporter
- Video capture
- Retry and trace support for failures

## Why This Project?

This repository is a strong example of:

- structured UI test automation
- reusable page object patterns
- maintainable test code
- practical Git-based automation learning

It is ideal for developers or QA engineers who want to practice Playwright while improving their Git and automation fundamentals.

## License

This project is licensed under the ISC license as declared in `package.json`.

## Author

Abhishek Dey
