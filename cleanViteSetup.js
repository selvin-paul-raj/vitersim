#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import readline from 'readline';
import chalk from 'chalk';
import { execSync } from 'child_process';

// Define paths for main files and folders
const paths = {
  appJsx: path.join(process.cwd(), 'src', 'App.jsx'),
  appTsx: path.join(process.cwd(), 'src', 'App.tsx'),
  appCss: path.join(process.cwd(), 'src', 'App.css'),
  assetsFolder: path.join(process.cwd(), 'src', 'assets'),
  indexCss: path.join(process.cwd(), 'src', 'index.css'),
  tailwindConfig: path.join(process.cwd(), 'tailwind.config.js'),
};

// Templates
const vanillaAppTemplate = `
export default function App() {
  return (
    <h1>Hello world!</h1>
  );
}
`;

const tailwindAppTemplate = `
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
}
`;

const tailwindCssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

const tailwindConfigContent = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

// Utility functions
const fileExists = (filePath) => fs.existsSync(filePath);

const deleteFile = (filePath) => {
  if (fileExists(filePath)) {
    fs.unlinkSync(filePath);
    console.log(chalk.red(`Deleted: ${filePath}`));
  }
};

const deleteFolder = (folderPath) => {
  if (fileExists(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true });
    console.log(chalk.red(`Deleted folder: ${folderPath}`));
  }
};

const setupTailwind = () => {
  console.log(chalk.blue("Setting up Tailwind CSS..."));
  try {
    execSync("npm install -D tailwindcss postcss autoprefixer", { stdio: 'inherit' });
    execSync("npx tailwindcss init -p", { stdio: 'inherit' });
    fs.writeFileSync(paths.tailwindConfig, tailwindConfigContent.trim(), 'utf-8');
    fs.writeFileSync(paths.indexCss, tailwindCssContent.trim(), 'utf-8');
    console.log(chalk.green("Tailwind CSS setup complete."));
  } catch (error) {
    console.error("Error during Tailwind setup:", error.message);
  }
};

// Display a selection prompt
const promptUser = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(question, (answer) => {
    rl.close();
    resolve(answer.toLowerCase());
  }));
};

const displayOptions = async () => {
  console.log(chalk.blue("\nChoose an option for CSS setup:"));
  console.log(`1. ${chalk.cyan("Vanilla CSS")}`);
  console.log(`2. ${chalk.green("Tailwind CSS")}\n`);

  const choice = await promptUser("Select (1 or 2): ");
  return choice === '2' ? 'tailwind' : 'vanilla';
};

const runCleanup = async () => {
  const confirm = await promptUser("Are you sure you want to clean up the Vite React project? (y/n): ");
  if (confirm !== 'y') {
    console.log(chalk.yellow("Cleanup canceled."));
    return;
  }

  const cssChoice = await displayOptions();

  // Proceed with cleanup
  deleteFile(paths.appCss);
  deleteFolder(paths.assetsFolder);
  
  const appPath = fileExists(paths.appJsx) ? paths.appJsx : paths.appTsx;
  if (appPath) {
    const appTemplate = (cssChoice === 'tailwind') ? tailwindAppTemplate : vanillaAppTemplate;
    fs.writeFileSync(appPath, appTemplate.trim(), 'utf-8');
    console.log(chalk.blue(`App component reset with ${(cssChoice === 'tailwind') ? "Tailwind" : "vanilla"} template.`));
  }

  if (cssChoice === 'tailwind') {
    setupTailwind();
  } else {
    fs.writeFileSync(paths.indexCss, '', 'utf-8');
    console.log(chalk.green("index.css reset to empty for vanilla CSS."));
  }

  console.log(chalk.green("Cleanup complete."));
};

runCleanup().catch((error) => console.error("Error during cleanup process:", error.message));
