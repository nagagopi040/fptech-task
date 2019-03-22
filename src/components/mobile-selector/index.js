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
      isModelSelected: false,
      dropdownOpen: false
    }
  }

  componentDidMount(){
    const  { BRANDS } = API;
    BRANDS().then( res => this.props.getBrands(res))
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { isBrandSelected, isModelSelected } = this.state;
    const { brands, models } = this.props;
    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle>select</DropdownToggle>
          <DropdownMenu>
            {
              brands.map( (brand,index) => {
                return (
                  <DropdownItem key={index}>{brand.attributeValue}</DropdownItem>
                )
              })
            }
          </DropdownMenu>
        </Dropdown>
        {
          isBrandSelected && 
          <Dropdown>
            <DropdownToggle>select</DropdownToggle>
            <DropdownMenu>
              {

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