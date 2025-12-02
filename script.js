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
      <p><strong>Pages:<strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
    `;

    // Add card to page
    container.appendChild(card);
    });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
displayLibrary();
