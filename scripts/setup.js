// Runs automatically after `npm install` / `npm ci` (see "postinstall" in package.json),
// or manually with `npm run setup`. npm itself installs the packages; this adds the rest.
import { execSync, execFileSync } from "child_process";
import fs from "fs";

// CI installs browsers (with OS deps) in its own workflow step
if (process.env.CI) {
  console.log("[setup] CI detected, skipping local setup.");
  process.exit(0);
}

console.log("[setup] Installing the Playwright Chromium browser...");
execSync("npx playwright install chromium", { stdio: "inherit" });

// Allure files already committed in main stay tracked, but local runs must not show
// them as modified/deleted (new run output is ignored via .gitignore)
try {
  const files = execSync("git ls-files allure-results allure-report", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean);
  // batch the paths to stay under Windows' command-line length limit
  for (let i = 0; i < files.length; i += 100) {
    execFileSync("git", ["update-index", "--skip-worktree", ...files.slice(i, i + 100)]);
  }
  console.log(`[setup] Git will ignore local changes to ${files.length} committed Allure files.`);
} catch {
  console.log("[setup] Not a git checkout, skipping Allure git setup.");
}

// VS Code extensions listed in .vscode/extensions.json (the same list VS Code recommends)
try {
  execSync("code --version", { stdio: "ignore" });
  const { recommendations } = JSON.parse(fs.readFileSync(".vscode/extensions.json", "utf-8"));
  for (const extension of recommendations) {
    console.log(`[setup] Installing VS Code extension ${extension}...`);
    try {
      execSync(`code --install-extension ${extension}`, { stdio: "ignore" });
    } catch {
      console.log(`[setup] Could not install ${extension}, install it from the Extensions view.`);
    }
  }
} catch {
  console.log("[setup] VS Code CLI ('code') not found, skipping extensions. VS Code will offer them when the folder is opened.");
}

console.log("[setup] Done. Run the tests with: npm test");
