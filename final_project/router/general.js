const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }

  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books, null, 4)));
  });

  get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  const get_book = new Promise((resolve, reject) => {
    resolve(res.send(books[isbn]));
  });

  get_book.then(() => console.log("Promise for Task 11 resolved"));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const selectedBooks = {};
  for (let i in books) {
    if (books[i].author == author) {
        selectedBooks[i] = books[i];
    }
  }
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(selectedBooks));
  });
  get_books.then(() => console.log("Promise for Task 12 resolved"));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const selectedBooks = {};  
  for (let i in books) {
    if (books[i].title == title) {
        selectedBooks[i] = books[i];
    }
  }
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(selectedBooks));
  });
  get_books.then(() => console.log("Promise for Task 13 resolved"));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  res.send({"reviews": books[isbn].reviews});
});

module.exports.general = public_users;
