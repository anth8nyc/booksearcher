import axios from "axios";

export default {
  // Gets all books
  getGoogleBooks: function(searched) {

    let stripSearch = searched.replace(/\s/g, '+');
    console.log(stripSearch);
    let stringRequest = ` https://www.googleapis.com/books/v1/volume?q=${stripSearch}&maxResults=25printType=books`;
    return axios.get(stringRequest);
  }, 
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
