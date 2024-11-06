#!/usr/bin/env node
import path from "path";
import fs from "fs";

// Define paths for main files and folders
const paths = {
  appJsx: path.join(process.cwd(), 'src', 'App.jsx'),
  appTsx: path.join(process.cwd(), 'src', 'App.tsx'),
  appCss: path.join(process.cwd(), 'src', 'App.css'),
  assetsFolder: path.join(process.cwd(), 'src', 'assets'),
  indexCss: path.join(process.cwd(), 'src', 'index.css'),
};

// Template for a simple "Hello World" component
const newAppTemplate = `
import React from 'react';

function App() {
  return (
    <div>
      Hello World!
    </div>
  );
}

export default App;
`;

// Utility function to check if a file/folder exists
const fileExists = (filePath) => fs.existsSync(filePath);

// Delete a file if it exists
const deleteFile = (filePath) => {
  try {
    if (fileExists(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error deleting ${filePath}:`, error.message);
  }
};

// Delete a folder if it exists
const deleteFolder = (folderPath) => {
  try {
    if (fileExists(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`Deleted folder: ${folderPath}`);
    }
  } catch (error) {
    console.error(`Error deleting folder ${folderPath}:`, error.message);
  }
};

// Rewrite `App.jsx` or `App.tsx` to a simple template
const rewriteAppComponent = () => {
  try {
    const appPath = fileExists(paths.appJsx) ? paths.appJsx : paths.appTsx;
    if (appPath) {
      fs.writeFileSync(appPath, newAppTemplate.trim(), 'utf-8');
      console.log(`Rewritten component: ${appPath}`);
    } else {
      console.log("No App.jsx or App.tsx file found to rewrite.");
    }
  } catch (error) {
    console.error(`Error rewriting component: ${error.message}`);
  }
};

// Clear the contents of `index.css`
const clearIndexCss = () => {
  try {
    if (fileExists(paths.indexCss)) {
      fs.writeFileSync(paths.indexCss, '', 'utf-8');
      console.log(`Cleared contents of: ${paths.indexCss}`);
    }
  } catch (error) {
    console.error(`Error clearing ${paths.indexCss}:`, error.message);
  }
};

// Execute cleanup operations
deleteFile(paths.appCss);          
deleteFolder(paths.assetsFolder);   
rewriteAppComponent();              
clearIndexCss();                   

console.log("Vite React project cleanup complete.");
