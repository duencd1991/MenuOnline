import React, { Component } from "react";
import "./VIewOrder.scss";
import { connect } from "react-redux";
import { clear, error, success, addOrder, subOrder, clearOrder } from "../../redux/actions";

class ViewOrder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orderTotal: 0,
      listOrder: [
        {
          id: 1,
          name: "Bàn 3",
          index: 1,
          orders: [
            {
              id: 1,
              name: "Sư tử nướng",
              price: 20,
              quantity: 1,
              status: "Doing"
            },
            {
              id: 2,
              name: "Hổ chiên giòn",
              price: 9,
              quantity: 5,
              status: "Prepare"
            },
            {
              id: 3,
              name: "Voi nguyên con",
              price: 8,
              quantity: 2,
              status: "Cancel"
            }
          ]
        },
        {
          id: 2,
          name: "Bàn 2",
          index: 2,
          orders: [
            {
              id: 1,
              name: "Sư tử nướng",
              price: 20,
              quantity: 1,
              status: "Prepare"
            },
            {
              id: 2,
              name: "Hổ chiên giòn",
              price: 9,
              quantity: 5,
              status: "Prepare"
            },
            {
              id: 3,
              name: "Voi nguyên con",
              price: 8,
              quantity: 2,
              status: "Prepare"
            }
          ]
        },
        {
          id: 3,
          name: "Bàn 1",
          index: 3,
          orders: [
            {
              id: 1,
              name: "Sư tử nướng",
              price: 20,
              quantity: 1,
              status: "Cancel"
            },
            {
              id: 2,
              name: "Hổ chiên giòn",
              price: 9,
              quantity: 5,
              status: "Done"
            },
            {
              id: 3,
              name: "Voi nguyên con",
              price: 8,
              quantity: 2,
              status: "Done"
            }
          ]
        },
        {
          id: 4,
          name: "Bàn 4",
          index: 4,
          orders: [
            {
              id: 1,
              name: "Sư tử nướng",
              price: 20,
              quantity: 1,
              status: "Done"
            },
            {
              id: 2,
              name: "Hổ chiên giòn",
              price: 9,
              quantity: 5,
              status: "Done"
            },
            {
              id: 3,
              name: "Voi nguyên con",
              price: 8,
              quantity: 2,
              status: "Done"
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
    let totalOrder = 0;
    return (
      <div className="view-body">

        <ul className="nav nav-tabs">
          <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab">MY ORDERS</a></li>
          <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#tab-2" role="tab">LIST ORDERS</a></li>
        </ul>
        <div className="card">
          <div className="card-block">
            <div className="tab-content">
              <div className="tab-pane active" id="tab-1">
                <div className="view-content">
                  {
                    listOrder.map((order, index) => {
                      let total = 0;
                      return <div key={index} className={order.status == "Done" ? "view-card card-done" : "view-card card-doing"}>
                        <div className="order-list">
                          {
                            order.orders.map((item, index) => {
                              total = item.status == "Done" ? total + (item.quantity * item.price) : total;
                              totalOrder = item.status == "Done" ? totalOrder + (item.quantity * item.price) : totalOrder;
                              return <div className={item.status == "Doing" ? "order-item item-doing" : item.status == "Cancel" ? "order-item item-cancel" : item.status == "Done" ? "order-item item-done" : "order-item"} key={index}>
                                <div className="item-details">{`${item.name} (${item.quantity} x ${item.price}K)`}</div>
                                <div className="item-total">{`${item.quantity * item.price}K`}</div>
                              </div>
                            })
                          }
                        </div>
                        {
                          <div className="card-total">{total > 0 ? `${total}K` : 0}</div>
                        }
                      </div>
                    })
                  }
                  <div className="order-total">
                    <div className="view-total">
                      {`${totalOrder}K`}
                    </div>
                    <button className="button btn-request">Gọi nhân viên</button>
                    <button className="button btn-pay">Thanh Toán</button>
                  </div>
                </div>

              </div>
              <div class="tab-pane" id="tab-2">
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
                              return <div className="order-item" key={index}>
                                <div className="item-details">{`${item.name} (${item.quantity})`}</div>
                                <div className="item-actions">
                                  <i className="fas fa-spinner action-doing"></i>
                                  <i className="fas fa-check-circle action-done"></i>
                                  <i className="fas fa-times-circle action-cancel"></i>
                                </div>
                              </div>
                            })
                          }
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
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