import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Row, Col, Card,CardBody, CardTitle, CardDeck, CardHeader, CardText,CardImg, Label, Input } from "reactstrap";

import MobileSelector from "./components/mobile-selector";
import { API } from "./utils";
import { getPoductDetails, getFilterData } from "./appActions";

import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      productsForCompare: [],
      filterValues: [],
      attribute_categories: [],
      catagery_attributes: {}
    }
  }

  componentDidMount() {
    API.getAllFilters().then(res => {
      this.props.getFilterData(res);
      let attribute_categories = [];
      for(var item in res) {
        attribute_categories.push(item)
      }
      this.setState({
        filterValues: attribute_categories,
        attribute_categories
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

  updateFilterValues = (value) => {
    var array = this.state.filterValues;
    var index = array.indexOf(value);
    if (index !== -1) array.splice(index, 1);
    if(this.state.filterValues !== array){
      this.setState({
      filterValues: array
    })}
  }

  renderSpecifications = (data) => {
    const { filters } = this.props;
    return Object.keys(filters).map(key => {
      return (
        <Card className="pb-5 mb-5 border-0">
          {
            filters[key].map( (filter, index) => {
              const attribute_name = filter.name;
              return(
                <CardText key={index} className="text-center">{ data[attribute_name] && data[attribute_name].attribute_values && data[attribute_name].attribute_values.length > 0 && data[attribute_name].attribute_values[0].value ? data[attribute_name].attribute_values[0].value : "NA"}</CardText>
              )
            })
          }
        </Card>)
    })
  }

  render() {
    const { productsForCompare, count, filterValues, attribute_categories } = this.state;
    const { filters } = this.props;

    const attributesContainer = attribute_categories.map( (attribute,index) => {
      return (
        <CardTitle key={index} className="m-0" tag="p">
          <Label check className="px-2"><Input type="checkbox" onChange={() => this.updateFilterValues(attribute)} checked={filterValues.includes(attribute)}/>{' '}{attribute}</Label>
        </CardTitle>
      )
    })

    const attributes = Object.entries(filters).map( (obj, index) => {
      return(
        <div key={index}>
        { filterValues.includes(obj[0]) &&
          <Card className="border-0 pb-4">
            <CardTitle tag="h5">{obj[0]}</CardTitle>
            {
              obj[1].map( (attribute, index) => {
                return(
                  <CardText key={index} className="text-center">{attribute.display_string}</CardText>
                )
              })}
          </Card>
        }
        </div>
      )
    })
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="2">
            <Card className="border-0 pb-4">
              <CardHeader tag="h4" className="px-0 border-0">Features</CardHeader>
              {attributesContainer}
            </Card>
            {attributes}
          </Col>
          <Col xs="10">
            <CardDeck className="border-0 text-center">
              {
                productsForCompare.length > 0 && productsForCompare.map( (product, index) => {
                  const { attributes } = product.productDetails;
                  const { attribute_map } = product.product_details.catalog_details;
                  return(
                    <Card key={index} className="border-0">
                      <CardImg src="https://www.91-img.com/pictures/126849-v6-honor-10-mobile-phone-large-1.jpg" height={300} alt="product image" />
                      <CardBody className="text-primary pb-4">
                        <CardTitle>{attributes.brand[0]}</CardTitle>
                        <CardText>{attributes.calculated_display_name[0]}</CardText>
                      </CardBody>
                      <CardBody className="pb-0">
                        {this.renderSpecifications(attribute_map)}
                      </CardBody>>
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