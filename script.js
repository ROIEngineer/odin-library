class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = this.loadFromLocalStorage();
        this.init();
    }

    init() {
        const dialog = document.getElementById('book-dialog');
        const newBookBtn = document.getElementById('new-book-btn');
        const dialogForm = document.getElementById('dialog-form');
        const cancelBtn = document.getElementById('dialog-cancel');

        newBookBtn.addEventListener('click', () => dialog.showModal());
        cancelBtn.addEventListener('click', () => dialog.close());
        
        dialogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBookFromForm();
            dialogForm.reset();
            dialog.close();
        });

        this.render();
    }

    addBookFromForm() {
        const title = document.getElementById('dialog-title').value;
        const author = document.getElementById('dialog-author').value;
        const pages = parseInt(document.getElementById('dialog-pages').value);
        const read = document.getElementById('dialog-read').checked;

        const book = new Book(title, author, pages, read);
        this.addBook(book);
    }

    addBook(book) {
        this.books.push(book);
        this.saveToLocalStorage();
        this.render();
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.saveToLocalStorage();
        this.render();
    }

    render() {
        const container = document.getElementById('library-container');
        container.innerHTML = '';

        this.books.forEach(book => {
            // Convert plain objects back to Book instances
            const bookInstance = this.createBookInstance(book);
            const card = this.createBookCard(bookInstance);
            container.appendChild(card);
        });
    }

    createBookInstance(bookData) {
        // If it's already a Book instance, return it
        if (bookData instanceof Book) {
            return bookData;
        }
        // Otherwise create a new Book instance from the data
        const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.read);
        book.id = bookData.id; // Preserve the ID
        return book;
    }

    createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = book.id;

        const title = document.createElement('h3');
        title.className = 'book-title';
        title.textContent = book.title;

        const author = document.createElement('p');
        author.className = 'book-author';
        author.textContent = `by ${book.author}`;

        const pages = document.createElement('p');
        pages.className = 'book-pages';
        pages.textContent = `${book.pages} pages`;

        const readBtn = document.createElement('button');
        readBtn.className = `read-status ${book.read ? 'read' : 'not-read'}`;
        readBtn.innerHTML = `${book.read ? '✓ Read' : '✗ Not Read'}`;
        readBtn.addEventListener('click', () => {
            // This will now work because 'book' is a Book instance
            book.toggleReadStatus();
            readBtn.className = `read-status ${book.read ? 'read' : 'not-read'}`;
            readBtn.innerHTML = `${book.read ? '✓ Read' : '✗ Not Read'}`;
            this.saveToLocalStorage();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this book?')) {
                this.removeBook(book.id);
            }
        });

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        actions.appendChild(readBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(actions);

        return card;
    }

    saveToLocalStorage() {
        // Save just the data, not the class methods
        const booksData = this.books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            pages: book.pages,
            read: book.read
        }));
        localStorage.setItem('library', JSON.stringify(booksData));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem('library');
        if (!data) return [];
        
        const booksData = JSON.parse(data);
        // Convert saved data back to Book instances
        return booksData.map(bookData => {
            const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.read);
            book.id = bookData.id;
            return book;
        });
    }
}

// Initialize library when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Library();
    
    // Add some sample books for portfolio display if empty
    const library = new Library();
    if (library.books.length === 0) {
        setTimeout(() => {
            const sampleBooks = [
                new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true),
                new Book('To Kill a Mockingbird', 'Harper Lee', 281, true),
                new Book('1984', 'George Orwell', 328, false),
                new Book('The Catcher in the Rye', 'J.D. Salinger', 234, true)
            ];
            
            sampleBooks.forEach(book => library.addBook(book));
        }, 500);
    }
});
