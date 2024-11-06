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
  if (fileExists(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Delete a folder if it exists
const deleteFolder = (folderPath) => {
  if (fileExists(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true });
  }
};

// Rewrite `App.jsx` or `App.tsx` to a simple template
const rewriteAppComponent = () => {
  const appPath = fileExists(paths.appJsx) ? paths.appJsx : paths.appTsx;
  if (appPath) {
    fs.writeFileSync(appPath, newAppTemplate.trim(), 'utf-8');
  } else {
    console.log("No App.jsx or App.tsx file found to rewrite.");
  }
};

// Clear the contents of `index.css`
const clearIndexCss = () => {
  if (fileExists(paths.indexCss)) {
    fs.writeFileSync(paths.indexCss, '', 'utf-8');
  }
};


try {
  deleteFile(paths.appCss);          
  deleteFolder(paths.assetsFolder);   
  rewriteAppComponent();              
  clearIndexCss();                   

  console.log("Vite React project cleanup complete.");
} catch (error) {
  console.error("Error during cleanup:", error.message);
}
