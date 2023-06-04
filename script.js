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
function renderLibrary(myLibrary) {
    library.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const card = createBookCard(book.title, book.author, book.pages, book.read);
        card.querySelector("button").dataset.index = i;
        card.dataset.index = i;
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
    const removeBtn = document.createElement("button");

    cardTitle.textContent = `"${title}"`;
    cardTitle.classList.add("book-card-title");
    card.appendChild(cardTitle);

    cardAuthor.textContent = `by ${author}`;
    cardAuthor.classList.add("book-card-author");
    card.appendChild(cardAuthor);

    cardPages.textContent = `${pages} pages`;
    cardPages.classList.add("book-card-pages");
    card.appendChild(cardPages);

    cardStatus.textContent = read ? "Read" : "Not read";
    cardStatus.classList.add("book-card-status");
    card.appendChild(cardStatus);

    removeBtn.textContent = "Remove the book";
    removeBtn.classList.add("remove-button");
    removeBtn.id = "removeBtn";
    removeBtn.addEventListener("click", e => {
        const index = removeBtn.dataset.index;
        console.log(index);
        myLibrary.splice(index, 1);

        renderLibrary(myLibrary);
    });

    card.appendChild(removeBtn);

    card.classList.add("book-card");
    return card;
}

const mask = document.querySelector("#mask");
const addBookBtn = document.querySelector("#addBook");
addBookBtn.addEventListener("click", () => {
    mask.classList.remove("hidden");
});

const closeBtn = document.querySelector("#close");
closeBtn.addEventListener("click", () => {
    mask.classList.add("hidden");
});

function getData() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#status").checked;
    return {
        title: title,
        author: author,
        pages: pages,
        read: status,
    };
}

const form = document.querySelector("#form");
const formBtn = document.querySelector("#formBtn");
form.addEventListener("submit", e => {
    const book = getData();
    addBookToLibrary(book.title, book.author, book.pages, book.read);
    renderLibrary(myLibrary);

    mask.classList.add("hidden");

    e.preventDefault();
});

renderLibrary(myLibrary);
