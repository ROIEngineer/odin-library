const myLibrary = [];

function Book(title, author, pages, read = false) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read = false) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

function displayLibrary() {
  const container = document.getElementById("library-container");

  // Clear container before re-rendering
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    // Create card
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-id", book.id); // Useful for delete buttons later

    // Book info
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
    `;

    // Add card to page
    container.appendChild(card);
    });
}

const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const dialogForm = document.getElementById("dialog-form");

// open modal
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
  document.getElementById("dialog-title").focus();
});

// handle cancel button automatically (method="dialog" makes ESC or cancel close)
document.getElementById("dialog-cancel").addEventListener("click", () => {
  dialog.close();
});

dialogForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents actual dialog form submission

  const title = document.getElementById("dialog-title").value.trim();
  const author = document.getElementById("dialog-author").value.trim();
  const pages = parseInt(document.getElementById("dialog-pages").value, 10);
  const read = document.getElementById("dialog-read").checked;

  if (!title || !author || !pages) {
    alert("Please fill out all fields.");
    return;
  }

  addBookToLibrary(title, author, pages, read);
  displayLibrary();

  dialog.close();
  dialogForm.reset();
});
