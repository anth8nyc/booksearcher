import React, { useState, useEffect } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import NoMatch from "./NoMatch";

function Books() {
  // Setting component's initial state
  const [gbooks, setgBooks] = useState([]);
  const [savedbooks, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  function loadSavedBooks() {
    API.getSavedBooks()
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Load all saved books
  useEffect(() => {
    loadSavedBooks();
  }, []);

  // Saves a book from the Google Books API to the db, then reloads books from the db
  function saveBook(gbook) {
    API.saveBook({
      imgsrc: gbook.volumeInfo.imageLinks.smallThumbnail,
      title: gbook.volumeInfo.title,
      authors: gbook.volumeInfo.authors,
      description: gbook.volumeInfo.description,
      link: gbook.volumeInfo.previewLink,
    })
      .then((res) => {
        console.log(res);
        document.querySelector(`.al`).classList.remove("d-none");
      })
      .catch((err) => console.log(err));

    setTimeout(function () {
      document.querySelector(`.al`).classList.add("d-none");
    }, 1800);
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
    // console.log(formObject.searched);
    API.getGoogleBooks(formObject.searched)
      .then((res) => {
        console.log(res.data.items);
        setgBooks(res.data.items);
        if (res.data.items === undefined) {
          setgBooks([]);
        } else {
          setgBooks(res.data.items);
        }
      })
      .catch((err) => console.log(err));
  }
  console.log(savedbooks);
  console.log(gbooks);
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
                  placeholder="Search"
                />
                <FormBtn onClick={handleFormSubmit}>Search</FormBtn>
              </Row>
            </form>

            <div className="d-none container row no-gutters al justify-content-center mb-3">
              <div
                className="row alert alert-success m-auto col-md-3 col-9 rounded-pill"
                role="alert"
              >
                <p className="m-auto p-1">Book saved!</p>
              </div>
            </div>
          </Col>

          {!gbooks ? (
            <NoMatch />
          ) : gbooks.length ? (
            <List>
              {gbooks.map((gbook) => (
                <ListItem key={gbook.id}>
                  <Col flex size="md-12">
                    <Row justify>
                      <a href={gbook.volumeInfo.previewLink}><img
                        className="m-auto col-12"
                        src={gbook.volumeInfo.imageLinks.smallThumbnail}
                        alt={gbook.volumeInfo.title}
                      ></img></a>
                      <Col size="md-10 12">
                        <strong>
                          {gbook.volumeInfo.title} by {gbook.volumeInfo.authors}
                        </strong>
                        <p>{gbook.volumeInfo.description}</p>
                        <a href={gbook.volumeInfo.previewLink}>
                          See on Google Books →
                        </a>
                        <br></br>
                        <br></br>
                        <SaveBtn onClick={() => saveBook(gbook)} />
                        <br></br>
                      </Col>
                    </Row>

                  </Col>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3 className="mt-5" style={{ textAlign: "center" }}>
              – Search for Books –
            </h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;