# Daylight — Daily Task Manager

A polished, responsive TODO app built with React and Vite. Add tasks, track progress, filter your list, and keep your tasks between visits with browser LocalStorage. No backend or account is required.

## Features

- Add tasks using the button or Enter; empty tasks are rejected.
- Mark tasks complete or active, with clear visual styling.
- Delete tasks instantly or clear all completed tasks.
- Filter the list by All, Active, and Completed.
- View total, in-progress, and completed task counts.
- See task creation times and a helpful empty state.
- Persist tasks in LocalStorage, with safe handling for invalid stored data.
- Responsive layout, keyboard focus styles, and reduced-motion support.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install and run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview the production build:

```sh
npm run build
npm run preview
```

## Deploy to GitHub Pages

The Vite `base: './'` setting makes built assets resolve correctly both at the root of a domain and under a GitHub Pages project path.

1. Create a GitHub repository and add it as this project's `origin` remote.
2. Make sure Git is authenticated and has permission to push to that repository.
3. Run:

   ```sh
   npm install
   npm run deploy
   ```

`npm run deploy` builds the app and publishes `dist/` to the `gh-pages` branch. In the repository's **Settings → Pages**, select **Deploy from a branch**, then choose `gh-pages` and `/(root)`. GitHub Pages will show the live URL in that settings page.

## Screenshots

This section is reserved for screenshots of the desktop and mobile layouts. Capture them from the running app and add the image files here when available.

## Project structure

```text
src/
  components/
    EmptyState.jsx
    Header.jsx
    TaskInput.jsx
    TaskItem.jsx
    TaskList.jsx
    TaskStats.jsx
  App.jsx
  App.css
  index.css
  main.jsx
```
