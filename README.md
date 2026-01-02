# Library App

A small, beginner-friendly web app to manage a personal book library. Add books, mark them read/unread, remove books — and everything persists in your browser via `localStorage`. Perfect as a portfolio piece or as the basis for a React rewrite.

---

## Demo / Screenshot

![App screenshot](./dashboard-project.png)

---

## Features

* Add books (title, author, pages, read status) via a modal form
* List books as responsive cards
* Toggle read / unread on each book
* Delete books with confirmation
* Data persisted in `localStorage` so your library survives page reloads
* Clean, responsive CSS and accessible `<dialog>` modal
* Simple, easy-to-follow code — great for beginners

---

## Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* `localStorage` for persistence

---

## Getting Started

### Prerequisites

No build tools or Node required to run the current project. You only need a modern browser.

If you prefer to run a tiny local server (recommended for consistent behavior of the `<dialog>` element), you can use one of these:

* `python` (any version 3+):

  ```bash
  python -m http.server 3000
  ```
* `npx serve` (Node):

  ```bash
  npx serve .
  ```

### Run locally (quick)

1. Clone the repo:

   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. Open `index.html` directly in your browser **or** run a simple server (recommended):

   ```bash
   python -m http.server 3000
   # then open http://localhost:3000 in your browser
   ```

---

## Project Structure

```
/ (repo root)
├── index.html        # main markup, includes <dialog> modal
├── style-cp.css      # main stylesheet (cards, dialog styling)
├── script.js         # all app logic (Book constructor, display, handlers, storage)
├── dashboard-project.png  # screenshot (optional)
└── README.md
```

---

## How it works — quick overview

* `Book` constructor creates book objects with a `crypto.randomUUID()` id and a `toggleRead()` prototype method.
* `myLibrary` array holds all Book instances.
* `displayLibrary()` renders the array into "cards" inside `#library-container`.
* Actions (toggle, delete) are handled with event delegation on the container using `data-id` attributes to map DOM to data.
* `saveLibrary()` / `loadLibrary()` serialize the array to JSON and restore instances on load (so prototype methods still work).

---

## Tips for Development / Extending

* To add undo for deletes: store a temporary backup of the deleted book and offer “Undo” for a few seconds.
* For validation improvements: replace `alert()` with inline validation messages in the modal.
* Accessibility: ensure focus is trapped inside the modal while open, and return focus back to the New Book button after close.
* To add tests: convert logic functions to pure functions (where helpful) and test with Jest.

---

## Rewriting in React (next steps — roadmap)

You mentioned rebuilding in React — here’s a simple plan:

1. Initialize a React app (Vite recommended for speed):

   ```bash
   npm create vite@latest library-react -- --template react
   cd library-react
   npm install
   npm run dev
   ```
2. Create components:

   * `App` — root container + state
   * `BookCard` — displays one book (toggle/delete)
   * `BookFormModal` — add/edit form
   * `LibraryGrid` — layout for cards
3. Keep persistence with `localStorage` (use `useEffect` to sync).
4. Optionally add Context or Zustand for state if app grows.

If you’d like, I can scaffold the full React version for you (components, CSS, and localStorage integration).

---

## Contributing

Contributions are welcome. If you want to suggest features or send improvements:

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes and open a PR with a short description

---

## License

This project is released under the MIT License — feel free to use it for learning, portfolio, or personal projects.

---
