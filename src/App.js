import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

import MobileSelector from "./components/mobile-selector";

import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <Container className="text-center" fluid={true}>
        <Row>
          <Col xs="3">Aside left</Col>
          <Col xs="9"><MobileSelector/></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
