const myLibrary = [];
const addBookButton = document.querySelector('.add-book-button');
const addBookModal = document.querySelector('.add-book-modal');
const readBookFormButton = document.querySelector('.read-button-form');
const newBookFormButton = document.querySelector('.submit-button-form');
const newBookForm = document.querySelector('.add-book-form');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
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

    let numBooks = 0;

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

        readButton.addEventListener('click', () => {
            if (readButton.classList.contains('read')) {
                readButton.textContent = 'Not read yet';
                readButton.classList.remove('read');
                readButton.classList.add('not-read-yet');
            } else {
                readButton.textContent = 'Read';
                readButton.classList.remove('not-read-yet');
                readButton.classList.add('read');
            }
            myLibrary[readButton.parentElement.parentElement.data].toggleRead(); // Toggle the data itself
        });

        var removeButton = document.createElement('button');
        removeButton.classList.add('remove-button', 'bg-gray-500' ,'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
        removeButton.textContent = 'Remove';

        removeButton.addEventListener('click', () => { // Handles the deletion of the associated book container
            myLibrary.splice(removeButton.parentElement.parentElement.data, 1);
            displayBooks();
        });

        bookButtons.appendChild(readButton);
        bookButtons.appendChild(removeButton);
        
        book.appendChild(bookInformation);
        book.appendChild(bookButtons);

        book.data = numBooks++;
        libraryContainer.appendChild(book);

    })
}

// Add some info if titles are missing and what not
function addCustomValidity() {
    const titleInput = document.querySelector('#title');
    const titleValidityState = titleInput.validity;
    const authorInput = document.querySelector('#author');
    const authorValidityState  = authorInput.validity;
    const pageInput = document.querySelector('#pages');
    const pageValidityState = pageInput.validity;

    if (titleValidityState.valueMissing) {
        titleInput.setCustomValidity('You need to add a title!');
    } else {
        titleInput.setCustomValidity('');
    }

    if (authorValidityState.valueMissing) {
        authorInput.setCustomValidity('You need to add an author!');
    } else {
        authorInput.setCustomValidity('');
    }

    if (pageValidityState.valueMissing) {
        pageInput.setCustomValidity('You need to a number of pages!');
    } else {
        pageInput.setCustomValidity('');
    }

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
// And changes the state of the button
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
        // Handle the form data (make sure it doesn't unintentionall submit the form)
        event.preventDefault();
        addCustomValidity();
        if (newBookForm.checkValidity()) { // forms valid we're good
            var title = document.querySelector('#title').value;
            var author = document.querySelector('#author').value;
            var pages = document.querySelector('#pages').value;
            var read = document.querySelector('.read-button-form').classList.contains('read') ? true : false;
            addBookToLibrary(title, author, pages, read);
            displayBooks();
            addBookModal.close();
        } else {
            newBookForm.reportValidity();
        }
});


/**
 * Add a copyright
 */

document.getElementById("copyright").innerHTML = "&copy; " + new Date().getFullYear() + " Derek Enterprise. All rights reserved.";