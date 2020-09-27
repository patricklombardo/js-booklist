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

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");

  // Add classes
  div.className = `alert ${className}`;

  // Add text
  div.appendChild(document.createTextNode(message));

  // Get parent
  const container = document.querySelector(".container");

  // Get form
  const form = document.querySelector("#book-form");

  // Insert alert before form
  container.insertBefore(div, form);

  // Timeout alert after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear Fields
UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

// Event Listeners

// Event Listener for Add Book
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

  // Validate input
  if (title === "" || author === "" || isbn === "") {
    // Invalid Input
    // Show error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert(`${book.title} has been added to your list.`, "success");

    // Clear Fields
    ui.clearFields();
  }
});

// Event Listener for Delete
document.querySelector("#book-list").addEventListener("click", function (e) {
  e.preventDefault();

  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  //Show Alert
  ui.showAlert(`Book removed.`, "success");
});
