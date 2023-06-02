let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("Title", "Author", 100, false);
addBookToLibrary("The Hobbit", "J. R. R. Tolkien",  295, false);
addBookToLibrary("Demian", "Hermann Hesse",  390, true);
addBookToLibrary("Think Like a Programmer", "Anton Spraul",  260, false);

const library = document.querySelector("#library");
// Render all objects from the array on page
function renderLibrary() {
    for (const book of myLibrary) {
        const card = createBookCard(book.title, book.author, book.pages, book.read);
        library.appendChild(card)
    }
}

// Create an HTML element with book info
function createBookCard(title, author, pages, read) {
    const card = document.createElement("div");
    const cardTitle = document.createElement("div");
    const cardAuthor = document.createElement("div");
    const cardPages = document.createElement("div");
    const cardStatus = document.createElement("div");

    cardTitle.textContent = title;
    card.appendChild(cardTitle);

    cardAuthor.textContent = author;
    card.appendChild(cardAuthor);

    cardPages.textContent = pages;
    card.appendChild(cardPages);

    cardStatus.textContent = read ? "Read" : "Not read";
    card.appendChild(cardStatus);

    card.classList.add("book-card");
    return card;
}

renderLibrary();
