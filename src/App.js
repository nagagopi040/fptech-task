import React, { Component } from 'react';
import { Container, Row, Col, CardDeck, Card } from "reactstrap";
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
        var product = res[0];
        products.push(product);
        this.setState(prevState => ({
          count: prevState.count+1,
          productsForCompare: products
        }));

        const data = product.product_details.catalog_details.attribute_map;
        Object.keys(data).map(key => {
          let obj= []
          obj.push(data[key])
          console.log()
        })
      });
  }
  render() {
    const { productsForCompare, count } = this.state;
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="2">Aside left</Col>
          <Col xs="10">
            <CardDeck className="border-0">
              {
                productsForCompare.length > 0 && productsForCompare.map( (product, index) => {
                  return(
                    <Card key={index}>
                      {JSON.stringify(product)}
                    </Card>
                  )
                })
              }
              {count <= 4 && <Card className="border-0"><MobileSelector onModelClick={this.onModelClick}/></Card>}
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
