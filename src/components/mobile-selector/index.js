import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { bindActionCreators } from "redux";

import { getModels, getBrands } from "./actions";
import { API } from "./../../utils";

class MobileSelector extends Component {
  constructor(props){
    super(props);
    this.state = {
      isBrandSelected: false,
      brandOpen: false,
      modelOpen: false,
      selectedBrand: "select brand",
      selectedModel: "select model"
    }
  }

  componentDidMount(){
    API.getAllBrands().then( res => this.props.getBrands(res))
  }

  componentDidUpdate(prevProps){
    if(prevProps.models !== this.props.models);
  }

  toggle = (value) => {
    this.setState(prevState => ({
      brandOpen: value === "brand" ? !prevState.brandOpen : prevState.brandOpen,
      modelOpen: value === "model" ? !prevState.modelOpen : prevState.modelOpen
    }));
  }

  selectBrandItem = (value) => {
    this.setState({
      isBrandSelected: true,
      selectedBrand: value,
      brandOpen: false
    });
    API.getBrandModels(value).then( res => this.props.getModels(res))
  }

  selectModelItem = (catalogId, productId) => {
    this.setState({
      isBrandSelected: false,
      selectedBrand: "select brand",
      selectedModel: "select model"
    });
    this.props.onModelClick(catalogId, productId);
    this.props.getModels([]);
  }

  render() {
    const { isBrandSelected, isModelSelected, selectedBrand, selectedModel, brandOpen, modelOpen } = this.state;
    const { brands, models } = this.props;
    return (
      <div>
        <Dropdown isOpen={brandOpen} toggle={ () => this.toggle("brand")}>
          <DropdownToggle>{selectedBrand}</DropdownToggle>
          <DropdownMenu>
            {
              brands.map( (brand,index) => {
                return (
                  <DropdownItem key={index} onClick={() => this.selectBrandItem(brand.attributeValue)} >{brand.attributeValue}</DropdownItem>
                )
              })
            }
          </DropdownMenu>
        </Dropdown>
        {
          isBrandSelected && 
          <Dropdown isOpen={modelOpen} toggle={() => this.toggle("model")} className="py-4">
            <DropdownToggle>{selectedModel}</DropdownToggle>
            <DropdownMenu>
              {
                models.map( (model, index) => {
                  const { attributes } = model;
                  return (
                    <DropdownItem key={index} onClick={() => this.selectModelItem(model)} >{attributes.calculated_display_name[0]}</DropdownItem>
                  )
                })
              }
            </DropdownMenu>
          </Dropdown>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  brands : state.mobileSelectorReducer.brands,
  models : state.mobileSelectorReducer.models
})

const mapDispatchToProps = (dispatch) => ({
  getBrands: bindActionCreators(getBrands, dispatch),
  getModels: bindActionCreators(getModels, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileSelector);