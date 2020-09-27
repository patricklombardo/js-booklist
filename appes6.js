// Now let's do this in ES6

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn, index) {
    const books = Store.getBooks();
    books.forEach(function (book) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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

    // Add to Local Storage
    Store.addBook(book);

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

  // Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show Alert
  ui.showAlert(`Book removed.`, "success");
});
