import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../App.scss';
import * as services from '../services/ProductService';
import { alertTypes } from "../../../../constants/actionTypes";
import FormProduct from '../FormProduct';

class CreateProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      images: [],
      price: 0,
      catalog: ""
    }
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'));
  }

  changeData = (state) => {
    this.setState(state);
  };

  handleCreateProduct = () => {
    const state = this.state;
    let data = {
      title: state.title,
      images: state.images,
      price: state.price,
      catalog: state.catalog
    };
    services.createProduct(data, response => {
      if (response.isSuccess) {
        this.props.dispatch({ type: alertTypes.SUCCESS, message: "Tạo sản phẩm thành công!" });
        this.props.history.push("/ListProduct");
      }
    }, error => {
      this.props.dispatch({ type: alertTypes.ERROR, message: error });
    });
  };

  render() {
    return (
      <div className="admin-container">
        <FormProduct header='Thêm sản phẩm mới' changeData={this.changeData} handleSubmit={this.handleCreateProduct} handleCancel={(e) => this.props.history.push("/ListProduct")} />
      </div>
    );
  }
}

export default connect()(CreateProduct);