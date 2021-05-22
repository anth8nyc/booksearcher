import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getSavedBooks()
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
        }
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   if (formObject.title && formObject.author) {
  //     API.saveBook({
  //       title: formObject.title,
  //       author: formObject.author,
  //       synopsis: formObject.synopsis
  //     })
  //       .then(res => loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };
  console.log(books);
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-11">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            
            {books.length ? (
              <List>
                {books.map(book => (
                
                  <ListItem key={book._id}>
                  <Col size="md-12">
                    <Row>
                      <img className="m-auto"
                        src={book.imgsrc} alt={book.title}
                      ></img>
                      <Col size="md-10">
                        <strong>
                          {book.title} by {book.authors}
                        </strong>
                        <p>{book.description}</p>
                        <a href={book.link}>See on Google gBooks →</a>
                        <br></br>
                        <br></br>
                        <DeleteBtn onClick={() => deleteBook(book._id)} />
                        <br></br>
                      </Col>
                    </Row>
                  </Col>
                </ListItem>
                ))}
              </List>
            ) : (
              <h3>No books saved yet!</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
