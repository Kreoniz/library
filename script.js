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

addBookToLibrary("Think Like a Programmer", "Anton Spraul",  260, false);

const library = document.querySelector("#library");
// Render all objects from the array on page
function renderLibrary(myLibrary) {
    library.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const card = createBookCard(i, book.title, book.author, book.pages, book.read);
        card.querySelector("button").dataset.index = i;
        library.appendChild(card)
    }
}

// Create an HTML element with book info
function createBookCard(index, title, author, pages, read) {
    const card = document.createElement("div");
    card.classList.add("book-card");

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("book-card-title");

    const cardAuthor = document.createElement("div");
    cardAuthor.classList.add("book-card-author");

    const cardPages = document.createElement("div");
    cardPages.classList.add("book-card-pages");

    const cardStatus = document.createElement("button");
    cardStatus.classList.add("book-card-status", "card-button");

    const cardInfo = document.createElement("dic");
    cardInfo.classList.add("card-info");

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-button", "card-button");

    const cardButtons = document.createElement("div");
    cardButtons.classList.add("card-buttons");

    cardTitle.textContent = `"${title}"`;
    cardInfo.appendChild(cardTitle);

    cardAuthor.textContent = `by ${author}`;
    cardInfo.appendChild(cardAuthor);

    cardPages.textContent = `${pages} pages`;
    cardInfo.appendChild(cardPages);

    cardStatus.textContent = read ? "Read" : "Not read";
    cardStatus.classList.add(read ? "read" : "not-read");
    cardStatus.type = "button";

    cardStatus.addEventListener("click", e => {
        myLibrary[index].read = !myLibrary[index].read;

        renderLibrary(myLibrary);
    });
    cardButtons.appendChild(cardStatus);

    removeBtn.textContent = "Remove the book";
    removeBtn.type = "button";
    removeBtn.id = "removeBtn";

    removeBtn.addEventListener("click", e => {
        myLibrary.splice(index, 1);

        renderLibrary(myLibrary);
    });

    cardButtons.appendChild(removeBtn);

    card.appendChild(cardInfo);
    card.appendChild(cardButtons);
    card.dataset.index = index;

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
