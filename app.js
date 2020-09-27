// JS Book List (ES5 Classes)
// Patrick Lombardo
// github.com/patricklombardo

// Book Constructor
// Handles creating book objects
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
// Set of prototype methods to add book to list, delete book, show alert, etc.
// This is the majority of the work
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function (book) {
  // Get book list element
  const list = document.querySelector("#book-list");

  // Create tr element
  const row = document.createElement("tr");

  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">X</a></td>

  `;

  list.appendChild(row);
};

UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

// Event Listeners
document.querySelector("#book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  // Instantiate the book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Add book to list
  ui.addBookToList(book);

  // Clear Fields
  ui.clearFields();
});
