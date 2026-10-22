# ParaBank Playwright Automation

End-to-end UI tests for the [ParaBank demo bank](https://parabank.parasoft.com/parabank/index.htm), written with Playwright (JavaScript) using the Page Object Model.

## Prerequisites

Install these first:

- [Node.js](https://nodejs.org/) (LTS)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) with the `code` command on your PATH (optional; needed only to install the extensions automatically)
- [Java](https://adoptium.net/) (optional; needed only to generate Allure reports)

## Setup

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

## Note

ParaBank is a public demo site behind Cloudflare. A test can occasionally fail on a "Performing security verification" page; CI retries failed tests twice.
