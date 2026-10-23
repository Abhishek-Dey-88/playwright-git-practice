# ParaBank Playwright Automation

End-to-end UI tests for the [ParaBank demo bank](https://parabank.parasoft.com/parabank/index.htm), written with Playwright (JavaScript) using the Page Object Model.

## Prerequisites

Install these first:

- [Node.js](https://nodejs.org/) (LTS)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) with the `code` command on your PATH (optional; needed only to install the extensions automatically)
- [Java](https://adoptium.net/) (optional; needed only to generate Allure reports)

## Setup
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
│   └── e2etestscripts.spec.js
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
```

`npm install` also runs the project setup script automatically ([scripts/setup.js](scripts/setup.js)), which:

- installs the Playwright Chromium browser
- installs the recommended VS Code extensions listed in [.vscode/extensions.json](.vscode/extensions.json)
- configures Git to ignore local changes to the committed Allure report files

To run the setup again later, use `npm run setup`.

## Running the tests

```bash
npm test            # all tests
npm run regression  # tests tagged @regression
```

Run a single test by its tag:

```bash
npx playwright test --grep "@regressionbillpaycheck"
```

Locally, the tests run in a visible browser one at a time. On CI they run headless and in parallel.

## Reports

- **Playwright HTML report:** `npx playwright show-report`
- **Allure report** (requires Java):

  ```bash
  npm run allure:generate
  npm run allure:open
  ```

Locally, every test is recorded on video; screenshots and traces are kept only for failed tests. On CI, screenshots, traces and videos are kept for every test.

## Project structure

| Folder | Contents |
|---|---|
| `tests/` | Test specs (`e2etestscripts.spec.js`) |
| `page/` | Page objects, accessed through `POManager` |
| `fixture/` | Custom Playwright fixtures (page objects, test data, a freshly registered user) |
| `utils/` | Test data generator and the step logger |
| `test-plans/` | Test plans for the ParaBank scenarios |
| `scripts/` | Project setup script |

## CI

GitHub Actions runs the full suite on every push and pull request to `main`. The Playwright HTML report and the Allure results are uploaded as run artifacts.

## Jenkins

The suite also runs on Jenkins through a Freestyle job named `Playwright-Automation`:

- **Source:** this GitHub repository, branch `main`
- **Trigger:** polls GitHub every 5 minutes (`H/5 * * * *`) and builds when there is a new commit
- **Agent:** Windows
- **Report:** the Allure report is published on every build, including failed ones

### Requirements on the Jenkins machine

- Node.js and Git on the system `PATH`
- Jenkins plugins: **Git** and **Allure**
- An Allure installation named `Allure` under **Manage Jenkins → Tools → Allure Commandline installations**

### Build step

Add an **Execute Windows batch command** build step with:

```bat
set CI=true

node --version
call npm --version
git --version

rem Remove result files committed in the repository so the report shows only this build
if exist allure-results rmdir /s /q allure-results

call npm ci
if errorlevel 1 exit /b %errorlevel%

call npx playwright install chromium
if errorlevel 1 exit /b %errorlevel%

call npx playwright test
if errorlevel 1 exit /b %errorlevel%
```

`set CI=true` makes the run use the CI settings in [playwright.config.js](playwright.config.js): headless browser, parallel workers, two retries, and screenshots, traces and videos for every test.

> **Note:** `npm` and `npx` are batch files on Windows, so they must be run with `call`. Without `call`, the build step stops after that line and the build reports success without running the tests.

### Post-build action

Add **Allure Report** with the results path `allure-results`.

## Note

ParaBank is a public demo site behind Cloudflare. A test can occasionally fail on a "Performing security verification" page; CI retries failed tests twice.

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
- Find transactions by amount
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
Sr. QA Analyst