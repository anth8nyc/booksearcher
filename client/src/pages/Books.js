import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function saveBook(book) {
    API.saveBook({
      imgsrc: book.volumeInfo.imageLinks.smallThumbnail,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      link: book.volumeInfo.previewLink,

    })
    .then(res => loadBooks())
    .catch(err => console.log(err));
  }
  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(formObject.searched);
    API.getGoogleBooks(formObject.searched)
      .then((res) => {
        console.log(res.data.items);
        setBooks(res.data.items);
        if (res.data.items === undefined) {
          books = [];
        } else {
          setBooks(res.data.items);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>What Books Should I Read?</h1>
          </Jumbotron>
          <Col size="md-12">
            <form>
              <Row fluid justify>
                <Input
                  onChange={handleInputChange}
                  name="searched"
                  placeholder="Search Books"
                  />
                <FormBtn onClick={handleFormSubmit}>Search</FormBtn>
              </Row>
            </form>
          </Col>

          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book.id}>
                  <Col size="md-12">
                    <Row>
                      <img className="m-auto"
                        src={book.volumeInfo.imageLinks.smallThumbnail}
                      ></img>
                      <Col size="md-10">
                        <strong>
                          {book.volumeInfo.title} by {book.volumeInfo.authors}
                        </strong>
                        {/* <Link to={"/books/" + book.id}> */}
                        {/* </Link> */}
                        <p>{book.volumeInfo.description}</p>
                        <a href={book.volumeInfo.previewLink}>See on Google Books →</a>
                        <br></br>
                        <br></br>
                        <SaveBtn onClick={() => saveBook(book)} />
                        <DeleteBtn onClick={() => saveBook(book)} />
                        <br></br>
                      </Col>
                    </Row>
                  </Col>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3 className="mt-5" style={{textAlign: "center"}} >– No Results to Display –</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
