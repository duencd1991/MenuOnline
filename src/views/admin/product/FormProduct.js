import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../App.scss';
import UploadImage from "../../../components/commons/uploadImage/UploadImage";

class FormProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      title: "",
      images: [],
      price: 0,
      catalog: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.setState({
        title: nextProps.title,
        images: nextProps.images,
        price: nextProps.price,
        catalog: nextProps.catalog
      })
    }
  }

  onChangeFloatNumber = (e) => {
    let number = 0;
    if (e.target.value !== "") {
      number = Number(e.target.value);
    }
    if (number >= 0) {
      let state = this.state;
      state[e.target.name] = e.target.value;

      this.setState(state);
      this.props.changeData(state)
    }
  };

  onChange = (e) => {
    let state = this.state;
    state[e.target.name] = e.target.value;

    this.setState(state);
    this.props.changeData(state);
  };

  uploadImage = (uploadedImages) => {
    let state = this.state;
    state.images = uploadedImages;
    this.setState(state);
    this.props.changeData(state);
  };

  formValidate = () => {
    const state = this.state;
    let check = state.title !== "" && state.price !== '' && state.images.length !== 0;
    this.setState({
      isValid: check
    });
    return check;
  };

  handleSubmit = () => {
    if (this.formValidate()) {
      this.props.handleSubmit();
    }
  };

  onClickUploadImage = () => {
    if ($("#inputFile")) {
      $("#inputFile").click();
    }
  }

  render() {
    return (
      <div className="form-product">
        <h2 className="form-heading">{this.props.header}</h2>

        <div className="form-contents">
          <div className="form-group">
            <label className="label-form">Tên</label>
            <input type="text" name="title" className="input-text"
              placeholder="Title" value={this.state.title} onChange={this.onChange} autoFocus />
            {!this.state.isValid && this.state.title === '' && <span className="help-block">Field is required</span>}
          </div>
          <div className="double-columns">
            <div className="form-group">
              <label className="label-form">Giá (K)</label>
              <input type="text" name="price" className="input-text"
                placeholder="Price" value={this.state.price} onChange={this.onChangeFloatNumber} />
              {!this.state.isValid && this.state.price === '' && <span className="help-block">Field is required</span>}
            </div>
          </div>
          <div className="form-group">
            <label className="label-form">Hình ảnh</label>
            <div className="image-box">
              {
                this.state.images.map((image, index) => {
                  return <div className="image-item" key={index}>
                    <img className="img_item" src={image} />
                  </div>
                })
              }
              <div className="add-image" onClick={this.onClickUploadImage}>
                <i className="fas fa-plus"></i>
              </div>
            </div>
            <UploadImage onUpload={this.uploadImage} />
            {!this.state.isValid && this.state.images.length === 0 && <span className="help-block">Field is required</span>}
          </div>
          <div className="form-group group-btn">
            <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>SUBMIT</button>
            <button className="btn btn-cancel" onClick={this.props.handleCancel}>CANCEL</button>
          </div>
        </div>

      </div>
    );
  }
}

export default connect()(FormProduct);