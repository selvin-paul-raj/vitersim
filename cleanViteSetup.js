const fs = require('fs').promises;
const path = require('path');

// Paths relative to the root of the Vite React project
const paths = {
  appCss: path.join(__dirname, 'src', 'app.css'),
  assetsFolder: path.join(__dirname, 'src', 'assets'),
  indexCss: path.join(__dirname, 'src', 'index.css'),
  appFiles: [path.join(__dirname, 'src', 'App.jsx'), path.join(__dirname, 'src', 'App.tsx')]
};

// Helper to check if a file/folder exists
const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

// Function to delete a file
const deleteFile = async (filePath) => {
  if (await fileExists(filePath)) {
    await fs.unlink(filePath);
  }
};

// Function to delete a folder
const deleteFolder = async (folderPath) => {
  if (await fileExists(folderPath)) {
    await fs.rm(folderPath, { recursive: true, force: true });
  }
};

// Function to rewrite App file with a basic component
const rewriteAppFile = async () => {
  const content = `
import React from 'react';

function App() {
  return (
    <div>
      Hello World!
    </div>
  );
}

export default App;
  `.trim();

  for (const filePath of paths.appFiles) {
    if (await fileExists(filePath)) {
      await fs.writeFile(filePath, content);
      return;
    }
  }
  console.log('No App.jsx or App.tsx file found to rewrite.');
};

// Function to clear index.css
const clearIndexCss = async () => {
  if (await fileExists(paths.indexCss)) {
    await fs.writeFile(paths.indexCss, '');
  }
};

// Execute cleanup
(async () => {
  try {
    await deleteFile(paths.appCss);
    await deleteFolder(paths.assetsFolder);
    await rewriteAppFile();
    await clearIndexCss();
    console.log('Vite React project cleanup complete! :)');
  } catch (error) {
    console.error(':( Error during cleanup:', error);
  }
})();
