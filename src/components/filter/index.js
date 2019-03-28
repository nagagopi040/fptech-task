import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Card, CardBody, CardTitle, Button, CardHeader, CardText, Label, Input } from "reactstrap";

import { API } from "./../../utils";
import { getFilterData } from "./actions";

class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterValues: [],
      filteredData: []
    }
  }
  
  componentDidMount() {
    API.getAllFilters().then(res => {
      var filterValues = [];
      for(var item in res) {
        filterValues.push(item)
      }
      this.setState({
        filteredData: res,
        filterValues,
        filterHeaders: filterValues
      })
      this.props.getFilterData(res);
    })
  }

  setFilterData = (obj, arr) => {
    this.setState({
      filteredData: obj,
      filterValues: arr
    })
  }

  updateFilterValues = (attribute) => {
    const { value, checked } = this[attribute].props;
    const { filters } = this.props;
    var obj = this.state.filteredData;
    const { filterValues } = this.state;

    if (obj[value] && checked){
      var array = filterValues;
      var index = array.indexOf(value);
      if (index !== -1) array.splice(index, 1);
      delete obj[value]
      this.setFilterData(obj, array)
    } else if(!checked){
      const data = filters[attribute];
      filterValues.push(attribute)
      obj[attribute] = data;
      this.setFilterData(obj, filterValues)
    }
    this.props.getUpdatedFilterData(obj);
  }

  clearAllFilterData = (e) => {
    this.setFilterData([], [])
    this.props.getUpdatedFilterData({}, []);
  }

  render(){
    const { filterValues, filteredData } = this.state;
    const { filters } = this.props;
    var attribute_categories = [];
    for(var item in filters) {
      attribute_categories.push(item)
    }

    const attributesContainer = attribute_categories.map( (attribute,index) => {
      return (
        <CardTitle key={index} className="m-0" tag="p">
          <Label check><Input type="checkbox" ref={(f) => this[attribute] = f } value={attribute} onChange={ () => this.updateFilterValues(attribute)} checked={filterValues.includes(attribute)}/>{' '}{attribute}</Label>
        </CardTitle>
      )
    })

    const attributes = Object.entries(filters).map( (obj, index) => {
      return(
        <div key={index}>
        { filteredData[obj[0]] && 
          <Card className="border-0 py-4">
            <CardTitle tag="h5">{obj[0]}</CardTitle>
            {
              filteredData[obj[0]].map( (attribute, index) => {
                return(
                  <CardText key={index} className="text-center">{attribute.display_string}</CardText>
                )
              })}
          </Card>
        }
        </div>
      )
    })

    return(
      <Card className="border-0 px-0">
        <Card className="border-0 pb-4 d-flex flex-row">
          <CardHeader tag="span" className="px-0 border-0 d-inline-block h4">Features</CardHeader>
          <Button color="link" className="d-inline-block decoration-none" onClick={() => this.clearAllFilterData()}>Clear All</Button>
        </Card>
        <CardBody className="py-0">
          {attributesContainer}
          {attributes}
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  filters : state.filterReducer.filters
})

const mapDispatchToProps = (dispatch) => ({
  getFilterData: bindActionCreators(getFilterData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);