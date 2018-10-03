import React, { Component } from "react";
import "./Footer.scss";
import { connect } from "react-redux";
import { clear, error, success, addOrder, subOrder, clearOrder } from "../../redux/actions";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>List order:</p>
        {
          this.props.listOrder.map((item, index) => { 
            return <li key={index}>{`${item.name} (${item.quantity}) : ${item.quantity * item.price}K`}</li>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.alert,
  listOrder: state.order.listOrder
});

const mapDispatchToProps = dispatch => {
  return {
    clear: () => {
      dispatch(clear());
    },
    error: (message) => {
      dispatch(error(message))
    },
    success: (message) => {
      dispatch(success(message))
    },
    addOrder: (prod) => {
      dispatch(addOrder(prod))
    },
    subOrder: (prod) => {
      dispatch(subOrder(prod))
    },
    clearOrder: () => {
      dispatch(clearOrder())
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);