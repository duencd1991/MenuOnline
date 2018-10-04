import React, { Component } from "react";
import "./VIewOrder.scss";
import { connect } from "react-redux";
import { clear, error, success, addOrder, subOrder, clearOrder } from "../../redux/actions";

class ViewOrder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listOrder: [
        {
          id: 1,
          name: "Bàn 3",
          index: 1,
          status: "Doing",
          orders: [
            {
              id: 1,
              name: "Sư tử nướng",
              price: 20,
              quantity: 1
            },
            {
              id: 2,
              name: "Hổ chiên giòn",
              price: 9,
              quantity: 5
            },
            {
              id: 3,
              name: "Voi nguyên con",
              price: 8,
              quantity: 2
            }
          ]
        },
        {
          id: 2,
          name: "Bàn 2",
          index: 2,
          status: "Pending",
          orders: [
            {
              id: 1,
              name: "Sư tử nướng",
              price: 20,
              quantity: 1
            },
            {
              id: 2,
              name: "Hổ chiên giòn",
              price: 9,
              quantity: 5
            },
            {
              id: 3,
              name: "Voi nguyên con",
              price: 8,
              quantity: 2
            }
          ]
        },
        {
          id: 3,
          name: "Bàn 1",
          index: 3,
          status: "Pending",
          orders: [
            {
              id: 1,
              name: "Sư tử nướng",
              price: 20,
              quantity: 1
            },
            {
              id: 2,
              name: "Hổ chiên giòn",
              price: 9,
              quantity: 5
            },
            {
              id: 3,
              name: "Voi nguyên con",
              price: 8,
              quantity: 2
            }
          ]
        },
        {
          id: 4,
          name: "Bàn 4",
          index: 4,
          status: "Done",
          orders: [
            {
              id: 1,
              name: "Sư tử nướng",
              price: 20,
              quantity: 1
            },
            {
              id: 2,
              name: "Hổ chiên giòn",
              price: 9,
              quantity: 5
            },
            {
              id: 3,
              name: "Voi nguyên con",
              price: 8,
              quantity: 2
            }
          ]
        },
      ]
    }
  }

  componentDidMount() {
    //TODO: Load view order foreach 10s
  }

  render() {
    const {
      listOrder
    } = this.state;
    return (
      <div className="view-body">
        <div className="view-order-title">DANH SÁCH GỌI ĐỒ</div>
        <div className="view-content">
          {
            listOrder.map((order, index) => {
              return <div key={index} className="view-card">
                {
                  <div className="order-index">{order.index}</div>
                }
                <div className="order-name">
                  {order.name}
                </div>
                <div className="order-list">
                  {
                    order.orders.map((item, index) => {
                      return <div className="order-item" key={index}>{`${item.name} (${item.quantity})`}</div>
                    })
                  }
                </div>
                <div className={order.status == "Doing" ? "status status-doing" : order.status == "Pending" ? "status status-pending" : "status status-done"}>
                  {
                    order.status == "Doing" ? "Đang làm" : order.status == "Pending" ? "Đang chờ" : "Hoàn thành"
                  }
                </div>
              </div>
            })
          }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);