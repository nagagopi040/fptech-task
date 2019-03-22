import React, { Component } from 'react';
import { Container, Row, Col, CardDeck } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import MobileSelector from "./components/mobile-selector";
import { API } from "./utils";
import { getPoductDetails } from "./appActions";

import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      productsForCompare: []
    }
  }

  onModelClick = (catalog_id, product_id) => {
    API.getProductDetails(catalog_id, product_id)
      .then( res => {
        var products =  this.state.productsForCompare;
        products.push(res[0]);
        this.setState(prevState => ({
          count: prevState.count+1,
          productsForCompare: products
        }));
        this.props.getPoductDetails(res[0]);
      });
  }
  render() {
    const { productsForCompare, count } = this.state;
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="3">Aside left</Col>
          <Col xs="9">
            <CardDeck>
              {
                productsForCompare.length > 0 && productsForCompare.map( product => {
                  return JSON.stringify(product);
                })
              }
              {count <= 4 && <MobileSelector onModelClick={this.onModelClick}/>}
            </CardDeck>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product : state.appReducer.product
})

const mapDispatchToProps = (dispatch) => ({
  getPoductDetails: bindActionCreators(getPoductDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
