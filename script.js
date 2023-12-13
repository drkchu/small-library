const myLibrary = [];
const addBookButton = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.add-book-modal');
const readBookFormButton = document.querySelector('.read-button-form');
const newBookFormButton = document.querySelector('.submit-button-form');
const newBookForm = document.querySelector('.add-book-form');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addDefaultBookToLibrary() {
       let newBook = new Book('Atomic Habits', 'James Clear', '320', true);
       myLibrary.push(newBook); 
}
function addBookToLibrary(title, author, pages, read) {
    // Create the book
    let newBook = new Book(title, author, pages, read);

    // Add the book to the library
    myLibrary.push(newBook);
}

/**
 * Displays all the books currently in myLibrary
 */
function displayBooks() {
    let libraryContainer = document.querySelector('.library-container');
    libraryContainer.innerHTML = ''; // Clears the current books on display

    myLibrary.forEach((currBook) => {

        var book = document.createElement('div');
        book.classList.add('book');
        
        var bookInformation = document.createElement('div');
        bookInformation.classList.add('book-information');

        var title = document.createElement('h1');
        title.classList.add('title', 'font-semibold');
        title.textContent = `"${currBook.title}"`;

        var author = document.createElement('h1');
        author.classList.add('author', 'font-semibold');
        author.textContent = `By: ${currBook.author}`;

        var pages = document.createElement('h1');
        pages.classList.add('pages', 'font-semibold');
        pages.textContent = `${currBook.pages} pages`;

        bookInformation.appendChild(title);
        bookInformation.appendChild(author);
        bookInformation.appendChild(pages);

        var bookButtons = document.createElement('div');
        bookButtons.classList.add('book-buttons');

        var readButton = document.createElement('button');
        readButton.classList.add(currBook.read ? 'read' : 'not-read-yet','text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
        readButton.textContent = currBook.read ? 'Read' : 'Not read yet'

        var removeButton = document.createElement('button');
        removeButton.classList.add('bg-gray-500' ,'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
        removeButton.textContent = 'Remove';

        bookButtons.appendChild(readButton);
        bookButtons.appendChild(removeButton);
        
        book.appendChild(bookInformation);
        book.appendChild(bookButtons);
        libraryContainer.appendChild(book);
    })
}

// Adds a default book and displays it
addDefaultBookToLibrary();
displayBooks();

/**
 * Eventually refactor into single function 
 * 
 */

// Initialize add-a-book button

addBookButton.addEventListener('click', () => {
    addBookModal.showModal();
})

// Disables submit when toggling read/not read yet for new books
readBookFormButton.addEventListener('click', 
    function(event) {
        // Handle the form data
        event.preventDefault();

        if (this.classList.contains('read')) {
            this.textContent = 'Not read yet';
            this.classList.remove('read');
            this.classList.add('not-read-yet');
        } else {
            this.textContent = 'Read';
            this.classList.remove('not-read-yet');
            this.classList.add('read');
        }
});

// Disables submit when toggling read/not read yet for new books
newBookFormButton.addEventListener('click', 
    function(event) {
        // Handle the form data
        event.preventDefault();
        if (newBookForm.checkValidity()) {
            var title = document.querySelector('#title').value;
            var author = document.querySelector('#author').value;
            var pages = document.querySelector('#pages').value;
            var read = document.querySelector('.read-button-form').classList.contains('read') ? true : false;
            addBookToLibrary(title, author, pages, read);
            displayBooks();
            addBookModal.close();
        }
});
/**
 * Add a copyright
 */

document.getElementById("copyright").innerHTML = "&copy; " + new Date().getFullYear() + " Derek Enterprise. All rights reserved.";