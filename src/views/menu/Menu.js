import React, { Component } from "react";
import "./Menu.scss";
import tiger from "../../../public/images/tiger.jpg";
import { connect } from "react-redux";
import { clear, error, success, addOrder, subOrder, clearOrder, setTableOrder } from "../../redux/actions";

class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      confirmLogin: false,
      confirmCode: "",
      tableId: 0,
      tabCurrent: 0,
      listTab: [
        "Đồ ăn",
        "Đồ uống"
      ],
      listMenu: [
        [
          {
            id: 1,
            name: "Cá mập hấp",
            img: tiger,
            price: 10,
            quantity: 0
          },
          {
            id: 2,
            name: "Sư tử nướng",
            img: tiger,
            price: 20,
            quantity: 0
          },
          {
            id: 3,
            name: "Hổ chiên giòn",
            img: tiger,
            price: 9,
            quantity: 0
          },
          {
            id: 4,
            name: "Voi nguyên con",
            img: tiger,
            price: 8,
            quantity: 0
          },
          {
            id: 5,
            name: "Khủng long gỏi",
            img: tiger,
            price: 77,
            quantity: 0
          }
        ],
        [
          {
            id: 6,
            name: "Nước mắt cá",
            img: tiger,
            price: 12,
            quantity: 0
          },
          {
            id: 7,
            name: "Mưa sao băng",
            img: tiger,
            price: 15,
            quantity: 0
          },
          {
            id: 8,
            name: "Nước biển đen",
            img: tiger,
            price: 18,
            quantity: 0
          }
        ]
      ]
    }
  }

  componentWillMount() {
    const tableId = window.location.search.substring(1);
    if (tableId) {
      this.setState({
        tableId: tableId
      })
      this.props.setTableOrder(tableId);
    }
  }

  changeTab = (index) => {
    this.setState({ tabCurrent: index });
  }

  handleOrder = (prod) => {
    let state = this.state;
    for (let i = 0; i < state.listMenu[state.tabCurrent].length; i++) {
      if (state.listMenu[state.tabCurrent][i].id == prod.id) {
        state.listMenu[state.tabCurrent][i].quantity++;
        this.props.addOrder(state.listMenu[state.tabCurrent][i]);
      }
    }
    this.setState(state);
  }

  handleSubOrder = (prod) => {
    let state = this.state;
    for (let i = 0; i < state.listMenu[state.tabCurrent].length; i++) {
      if (state.listMenu[state.tabCurrent][i].id == prod.id && state.listMenu[state.tabCurrent][i].quantity > 0) {
        state.listMenu[state.tabCurrent][i].quantity--;
        this.props.subOrder(state.listMenu[state.tabCurrent][i]);
      }
    }
    this.setState(state);
  }

  confirmCode = (e) => {
    if (this.state.confirmCode === "123") {
      this.setState({
        confirmLogin: true
      })
    } else {
      this.setState({
        confirmCode: ""
      })
    }
  }

  onInputCode = (e) => {
    this.setState({
      confirmCode: e.target.value
    })
  }

  render() {
    const {
      tableId,
      tabCurrent,
      listMenu,
      listTab,
      confirmLogin,
      confirmCode
    } = this.state;
    if (tableId == 0) {
      return (
        <div className="table-content">
          <h1>Vui lòng quét mã QR tại bàn để gọi đồ!</h1>
        </div>
      );
    } else if (!confirmLogin) {
      return (
        <div className="confirm-content">
          <div className="confirm-form" >
            <div className="confirm-title">Nhập mã xác nhận đặt bàn</div>
            <input type="text" className="form-control" value={confirmCode} onChange={this.onInputCode} />
            <button type="button" className="btn btn-confirm" onClick={this.confirmCode}>XÁC NHẬN</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="table-content">
          <div className="menu-selector">
            {
              listTab.map((item, index) => {
                return <div key={index} onClick={(e) => this.changeTab(index)} className="tab-item">{item}</div>
              })
            }
          </div>
          <div className="menu-content">
            {
              listMenu[tabCurrent].map((prod, index) => {
                return <div key={index} className="card">
                  {
                    prod.quantity > 0 && <div className="prod-quantity">{prod.quantity}</div>
                  }
                  <img src={prod.img} alt={prod.name} />
                  <h1>{prod.name}</h1>
                  <p className="price">{prod.price}K</p>
                  <div className="btn-order">
                    <button onClick={(e) => this.handleSubOrder(prod)}>-</button>
                    <a>Gọi đồ</a>
                    <button onClick={(e) => this.handleOrder(prod)}>+</button>
                  </div>
                </div>
              })
            }
          </div>
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
    setTableOrder: (tableId) => {
      dispatch(setTableOrder(tableId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);