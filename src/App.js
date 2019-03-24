import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Row, Col, Card,CardBody, CardTitle, CardDeck, CardHeader, CardText,CardImg, Label, Input } from "reactstrap";

import MobileSelector from "./components/mobile-selector";
import Filter from "./components/filter";
import { API } from "./utils";
import { getPoductDetails, getFilterData } from "./appActions";

import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      productsForCompare: [],
      filters: [],
      filtersData: []
    }
  }

  componentDidMount() {
    API.getAllFilters().then(res => {
      this.props.getFilterData(res);
      this.setState({
        filters: res,
        filtersData: res
      })
    })
  }

  onModelClick = (model) => {
    const { catalogId, productId } = model.attributes;
    API.getProductDetails(catalogId, productId)
      .then( res => {
        var products =  this.state.productsForCompare;
        res[0].productDetails = model;
        var product = res[0];
        products.push(product);
        this.setState(prevState => ({
          count: prevState.count+1,
          productsForCompare: products
        }));
      });
  }

  getUpdatedFilterData = (data) => {
    this.setState({
      filtersData: data
    })
  }

  renderSpecifications = (data) => {
    const { filters, filtersData } = this.state;
    return Object.keys(filters).map(key => {
      return (
        <Card key={key} className="pb-5 mb-5 border-0">
          {
            filtersData[key] && filtersData[key].map( (filter, index) => {
              const attribute_name = filter.name;
              return(
                <CardText key={index} className="text-center">{ data[attribute_name] && data[attribute_name].attribute_values[0].value ? data[attribute_name].attribute_values[0].value : "NA"}</CardText>
              )
            })
          }
        </Card>)
    })
  }

  render() {
    const { productsForCompare, count } = this.state;

    return (
      <Container fluid={true}>
        <Row>
          <Col xs="2"><Filter getUpdatedFilterData={this.getUpdatedFilterData} /></Col>
          <Col xs="10">
            <CardDeck className="border-0 text-center">
              {
                productsForCompare.length > 0 && productsForCompare.map( (product, index) => {
                  const { attributes } = product.productDetails;
                  const { attribute_map } = product.product_details.catalog_details;
                  return(
                    <Card key={index} className="border-0">
                      <CardImg src="https://www.91-img.com/pictures/126849-v6-honor-10-mobile-phone-large-1.jpg" height={300} alt="product image" />
                      <CardBody className="text-primary px-0 mb-4">
                        <CardTitle>{attributes.brand[0]}</CardTitle>
                        <CardText>{attributes.calculated_display_name[0]}</CardText>
                      </CardBody>
                      <CardBody className="p-0">
                        {this.renderSpecifications(attribute_map)}
                      </CardBody>
                    </Card>
                  )
                })
              }
              {count <= 4 && <Card className="border-0 text-left"><MobileSelector onModelClick={this.onModelClick}/></Card>}
            </CardDeck>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product : state.appReducer.product,
  filters : state.appReducer.filters
})

const mapDispatchToProps = (dispatch) => ({
  getPoductDetails: bindActionCreators(getPoductDetails, dispatch),
  getFilterData: bindActionCreators(getFilterData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);