
# Vitersim

[![npm version](https://badge.fury.io/js/vitersim.svg)](https://badge.fury.io/js/vitersim)
[![license](https://img.shields.io/npm/l/vitersim.svg)](https://github.com/selvin-paul-raj/vitersim/blob/main/LICENSE)
[![node version](https://img.shields.io/node/v/vitersim.svg)](https://nodejs.org/)

<!--  -->
**Vitersim** is a robust CLI tool designed to streamline Vite React project setups by automating cleanup tasks and offering a Tailwind CSS integration option. With a single command, `Vitersim` removes unnecessary files, resets styles, and sets up a clean, ready-to-code project. For developers who prefer Tailwind CSS, `Vitersim` can quickly configure Tailwind CSS with essential files and settings, making it even easier to dive straight into custom styling.

## Key Features

- **Automatic Cleanup**: Removes default files like `App.css` and the `assets` folder.
- **Component Reset**: Rewrites `App.jsx` or `App.tsx` to a minimal "Hello World" component.
- **CSS Choice**: Prompts for either **vanilla CSS** or **Tailwind CSS** setup.
- **Instant Setup**: Directly runnable with `npx vitersim`—no installation required.
- **Improved Project Readiness**: Ideal for developers looking for a clean, clutter-free start.

## Installation and Usage

### Global Installation

You can install `vitersim` once globally using npm:

```bash
npm install -g vitersim
```

### Quick Start with `npx`

You can use **Vitersim** various `vite` projects by using `npx`:

```bash
npx vitersim
```



### Local Installation

You can also install it locally in your project:

```bash
npm install vitersim --save-dev
```

Then, add a custom script in your `package.json`:

```json
"scripts": {
  "clean": "vitersim"
}
```

Now, run the cleanup script with:

```bash
npm run clean
```

## How to Use

1. **Start the Cleanup**: Run `npx vitersim` or `npm run clean`.
2. **Confirm Cleanup**: When prompted, confirm if you'd like to proceed.
3. **Choose Your CSS Setup**: Select either `1` for Vanilla CSS or `2` for Tailwind CSS.
4. **Automatic Updates**: **Vitersim** will delete unneeded files, reset the main component, and set up either vanilla or Tailwind CSS based on your choice.

## Structure Requirements

To work effectively, your Vite React project should have this file structure:

```plaintext
project-root/
├── src/
│   ├── App.jsx (or App.tsx)
│   ├── App.css
│   ├── assets/
│   └── index.css
└── ...
```

## Example Output

After running **Vitersim**, your `App.jsx` or `App.tsx` will be reset to:

```javascript
import React from 'react';

function App() {
  return (
    <div>
      Hello World!
    </div>
  );
}

export default App;
```

If you selected **Tailwind CSS** during setup, `index.css` will include Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Technical Overview

**Vitersim** is a Node.js-based CLI tool that leverages `fs` and `path` modules for file management. It also uses `chalk` for color-coded prompts and outputs, making the user interaction intuitive. For those opting for Tailwind CSS, **Vitersim** runs commands to initialize Tailwind and updates the `tailwind.config.js` file with appropriate configurations.

## Compatibility

| Dependency  | Version           |
|-------------|-------------------|
| Node.js     | >= 14.0.0         |
| Vite        | >= 3.x            |
| React       | >= 17.x           |

## Troubleshooting

If you run into issues:
1. Ensure the required files and folders (`App.css`, `assets`, `App.jsx` or `App.tsx`, and `index.css`) are present.
2. Check that you have write permissions in your project directory.

For additional help, please visit the [GitHub issues page](https://github.com/selvin-paul-raj/vitersim/issues).

## Contributing

We welcome contributions to improve **Vitersim**. To contribute:
1. Fork the repository.
2. Create a branch with your feature or bug fix.
3. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. For details, see the [LICENSE](https://github.com/selvin-paul-raj/vitersim/blob/main/LICENSE) file.

## Connect with the Creator

Developed by [Selvin PaulRaj K](https://www.linkedin.com/in/selvinpaulraj). For feedback and contributions, feel free to connect!
