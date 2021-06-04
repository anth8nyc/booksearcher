import React from "react";
import { Col, Row } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h3>That's an interesting search. I could't find a book with that name–– try again?</h3>
            <h3>
              <span role="img" aria-label="Face With Wide Open Eyes Emoji">
                😳
              </span>
            </h3>
          </Jumbotron>
        </Col>
      </Row>
  );
}

export default NoMatch;
