const myLibrary = [];

function Book(title, author, pages, read = false) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// give each Book a toggle method
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

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
      <p class="read-status"><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>

      <div class="card-buttons">
        <button class="toggle-read-btn" data-id="${book.id}">
          ${book.read ? "Mark as unread" : "Mark as read"}
        </button>
	<button class="delete-btn" data-id="${book.id}" aria-label="Delete ${book.title}">
	  Delete
	</button>
      </div>
    `;

    // Add card to page
    container.appendChild(card);
    });
}

const container = document.getElementById("library-container");

container.addEventListener("click", (e) => {
  const toggleBtn = e.target.closest(".toggle-read-btn");
  if (toggleBtn) {  // click wasn't on a toggle button
    const id = toggleBtn.dataset.id;
    // find the book in the array
    const book = myLibrary.find((b) => b.id === id);
    if (!book) return;
    book.toggleRead();   // flip the boolean
    displayLibrary();    // re-render to show updated status and button label
  }

  const delBtn = e.target.closest(".delete-btn");
  if (delBtn) {
    const id = delBtn.dataset.id;

    // ask for confirmation
    const confirmed = confirm("Delete this book? This cannot be undone.");
    if (!confirmed) return;

    const index = myLibrary.findIndex((b) => b.id === id);
    if (index === -1) return;

    myLibrary.splice(index, 1); // remove from array
    displayLibrary(); // re-render UI
  }
});

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

  if (!title || !author || pages <= 0 || isNaN(pages)) {
    alert("Please fill out all fields.");
    return;
  }

  addBookToLibrary(title, author, pages, read);
  displayLibrary();

  dialog.close();
  dialogForm.reset();
});
