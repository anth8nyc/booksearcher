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
  const [gbooks, setgBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // // Load all books and store them with setBooks
  // useEffect(() => {
  //   loadBooks();
  // }, []);

  // // Loads all books and sets them to books
  // function loadBooks() {
  //   API.getSavedBooks()
  //     .then((res) => setBooks(res.data))
  //     .catch((err) => console.log(err));
  // }

  // Deletes a book from the database with a given id, then reloads books from the db
  function saveBook(gbook) {
    API.saveBook({
      imgsrc: gbook.volumeInfo.imageLinks.smallThumbnail,
      title: gbook.volumeInfo.title,
      authors: gbook.volumeInfo.authors,
      description: gbook.volumeInfo.description,
      link: gbook.volumeInfo.previewLink
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
        setgBooks(res.data.items);
        if (res.data.items === undefined) {
          gbooks = [];
        } else {
          setgBooks(res.data.items);
        }
      })
      .catch((err) => console.log(err));


  }
  console.log(gbooks)
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

          {gbooks.length ? (
            <List>
              {gbooks.map((gbook) => (
                <ListItem key={gbook.id}>
                  <Col size="md-12">
                    <Row>
                      <img className="m-auto"
                        src={gbook.volumeInfo.imageLinks.smallThumbnail}
                        alt={gbook.volumeInfo.title}
                      ></img>
                      <Col size="md-10">
                        <strong>
                          {gbook.volumeInfo.title} by {gbook.volumeInfo.authors}
                        </strong>
                        <p>{gbook.volumeInfo.description}</p>
                        <a href={gbook.volumeInfo.previewLink}>See on Google gBooks →</a>
                        <br></br>
                        <br></br>
                        <SaveBtn onClick={() => saveBook(gbook)} />
                        <DeleteBtn onClick={() => saveBook(gbook)} />
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
