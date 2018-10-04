import React, { Component } from "react";
import "./Footer.scss";
import { connect } from "react-redux";
import { clear, error, success, addOrder, subOrder, clearOrder } from "../../redux/actions";

class Footer extends Component {
  render() {
    let urlPage = window.location.pathname.toLowerCase();
    let hiddenBtnAction = false;
    if (urlPage === "/vieworder") {
      hiddenBtnAction = true;
    }
    if (this.props.listOrder.length == 0) {
      return null;
    } else {
      let total = 0;
      return (
        <div className="footer">
          <div className="box-order">
            <div>Danh sách gọi đồ:</div>
            <div className="list-order">
              {
                this.props.listOrder.map((item, index) => {
                  total += item.quantity * item.price;
                  return <div className="order-item" key={index}>{`${item.name} (${item.quantity}) : ${item.quantity * item.price} K`}</div>
                })
              }
            </div>
          </div>
          {
            total > 0 && <div className="mr-auto">
              <div className="box-total">
                <div>Tổng tiền:</div>
                <div>{`${total} K`}</div>
              </div>
              {
                hiddenBtnAction ? <div className="order-index">1</div> : <div className="box-button">
                  <button className="btn-primary" onClick={(e) => this.props.history.push("/viewOrder")}>Xác nhận</button>
                  <button className="btn-danger" onClick={(e) => this.props.clearOrder()}>Xóa</button>
                </div>
              }
            </div>
          }
        </div>
      );
    }
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