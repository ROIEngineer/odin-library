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

// element refs
const newBookBtn = document.getElementById("new-book-btn");
const newBookForm = document.getElementById("new-book-form");
const cancelBtn = document.getElementById("cancel-btn");

// Show / hide form
newBookBtn.addEventListener('click', () => {
  newBookForm.classList.toggle("hidden");
  // focus the title field - may delete later
  if (!newBookForm.classList.contains("hidden")) {
    document.getElementById("title").focus();
  }
});


// Cancel button hides the form and resets fields
cancelBtn.addEventListener("click", () => {
  newBookForm.reset();
  newBookForm.classList.add("hidden");
});

// Handle form submit
newBookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // IMPORTANT: stops form from submitting to a server

  // Read values from the form
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = parseInt(document.getElementById("pages").value, 10);
  const read = document.getElementById("read").checked;

  // Basic input-check (tiny safeguard)
  if (!title || !author || pages <= 0) {
    alert("Please fill out title, author and a valid pages number.");
    return;
  }

  // Create book and re-render
  addBookToLibrary(title, author, pages, read);
  displayLibrary();

  // Reset & hide form
  newBookForm.reset();
  newBookForm.classList.add("hidden");
});
