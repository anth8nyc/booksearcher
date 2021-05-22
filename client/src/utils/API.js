import axios from "axios";

export default {
  // Gets all books
  getGoogleBooks: function(searched) {

    let stripSearch = searched.replace(/\s/g, '+');
    console.log(stripSearch);
    let stringRequest = `https://www.googleapis.com/books/v1/volumes?q=${stripSearch}`;
    return axios.get(stringRequest);
  }, 
  getSavedBooks: function() {
    return axios.get("/api/savedbooks");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/savedbooks/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/savedbooks/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/savedbooks", bookData);
  }
};
