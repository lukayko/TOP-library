const myLibrary = [];

const bookList = document.querySelector("#book-list");
const modal = document.querySelector("dialog");
const openModalBtn = document.querySelector("#modal-btn");
openModalBtn.addEventListener("click", () => {
  modal.showModal();
});
const closeModalBtn = document.querySelector("#close-btn");
closeModalBtn.addEventListener("click", () => {
  modal.close();
});

const bookForm = document.querySelector("form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("input#title").value;
  const author = document.querySelector("input#author").value;
  const pages = document.querySelector("input#pages").value;
  const status = document.querySelector("input[type='radio']:checked").value;

  const newBook = new Book(name, author, pages, status);

  addBookToLibrary(newBook);
  displayMyLibrary(myLibrary);

  bookForm.reset();
  modal.close();
});

function Book(name, author, pages, status) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(newBookRecord) {
  myLibrary.push(newBookRecord);
}

function deleteBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayMyLibrary(myLibrary);
}

function changeBookStatus(index) {
  const bookStatus = myLibrary.at(index).status;
  bookStatus === "Yes"
    ? (myLibrary[index].status = "Not yet")
    : (myLibrary[index].status = "Yes");
  displayMyLibrary(myLibrary);
}

function displayMyLibrary(library) {
  bookList.innerHTML = "";
  library.forEach((book, index) => {
    bookList.appendChild(
      createBookRecord(book.name, book.author, book.pages, book.status, index)
    );
  });
}

function createBookRecord(name, author, pages, status, index) {
  const bookListItem = document.createElement("li");

  bookListItem.innerHTML = `
  <div id="book">
  <h2>${name}</h2>
  <p>Author: ${author}</p>
  <p>Pages: <span id="pages-span">${pages}</span></p>
  <p>Read status: ${status}</p>
  <div class="small-btn-container">
  <button onclick="changeBookStatus(${index})">Change read status</button>
  <button onclick="deleteBookFromLibrary(${index})">Delete book</button>
  </div>
  </div>`;

  return bookListItem;
}

addBookToLibrary(new Book("Harry Potter", "J.R. Tolkien", 320, "Not yet"));
addBookToLibrary(new Book("The Hobbit", "Grosling", 920, "Yes"));
addBookToLibrary(new Book("1984", "Orwell", 472, "Not yet"));

displayMyLibrary(myLibrary);
