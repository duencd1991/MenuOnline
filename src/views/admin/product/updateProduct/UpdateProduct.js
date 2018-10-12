import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../../../../App.scss';
import * as services from '../services/ProductService';
import { alertTypes } from "../../../../constants/actionTypes";
import FormProduct from '../FormProduct';

class UpdateProduct extends Component {

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
    const productId = window.location.search.substring(1);
    if (productId) {
      this.getProductById(productId);
    }
  }

  getProductById = (id) => {
    services.getProduct(id, response => {
      if (response.isSuccess) {
        this.setState({
          title: response.data[0].title,
          images: response.data[0].images,
          price: response.data[0].price,
          catalog: response.data[0].catalog
        })
      }

    }, error => {
    })
  };

  changeData = (state) => {
    this.setState(state);
  };

  handleUpdateProduct = () => {
    const productId = window.location.search.substring(1);
    if (productId) {
      const state = this.state;
      let data = {
        title: state.title,
        images: state.images,
        price: state.price,
        catalog: state.catalog
      };

      services.updateProduct(productId, data, response => {
        if (response.isSuccess) {
          this.props.history.push("/ListProduct");
        }
      }, error => {
        this.props.dispatch({ type: alertTypes.ERROR, message: error });
      });
    }
  };

  render() {
    return (
      <div className="admin-container">
        <FormProduct header='Cập nhật sản phẩm'
          title={this.state.title}
          images={this.state.images}
          price={this.state.price}
          catalog={this.state.catalog}
          changeData={this.changeData} handleSubmit={this.handleUpdateProduct} handleCancel={(e) => this.props.history.push("/ListProduct")} />
      </div>
    );
  }
}

export default connect()(UpdateProduct);