import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import { getModels, getBrands } from "./actions";

class MobileSelector extends Component {
  constructor(props){
    super(props);
    this.state = {
      isBrandSelected: false,
      isModelSelected: false
    }
  }

  componentDidMount(){
    
  }

  render() {
    const { isBrandSelected, isModelSelected } = this.state;
    const { brands, models } = this.props;
    return (
      <div>
        <Dropdown>
          <DropdownToggle>select</DropdownToggle>
          <DropdownMenu>
            {
              brands.map( (brand,index) => {
                return (
                  <DropdownItem key={index}>{brand}</DropdownItem>
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
  brands : state.filterReducer.brands,
  models : state.filterReducer.models
})

export default connect(mapStateToProps, {})(MobileSelector);