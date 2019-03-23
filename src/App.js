import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Row, Col, Card, CardTitle, CardDeck, CardHeader, CardText, Label, Input } from "reactstrap";

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
      attribute_categories: []
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
        })
      });
  }

  componentWillReceiveProps(nextProps){
    this.setState({productForCompare: nextProps});
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

  render() {
    const { productsForCompare, count, filterValues, attribute_categories, productForCompare } = this.state;
    const { filters } = this.props;
    console.log(productForCompare);

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
  product : state.appReducer.product,
  filters : state.appReducer.filters
})

const mapDispatchToProps = (dispatch) => ({
  getPoductDetails: bindActionCreators(getPoductDetails, dispatch),
  getFilterData: bindActionCreators(getFilterData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
