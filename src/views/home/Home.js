import React, { Component } from "react";
import "./Home.scss";
import tiger from "../../public/images/tiger.jpg"
import { connect } from "react-redux";
import { clear, error, success, addOrder, subOrder, clearOrder } from "../../redux/actions";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabCurrent: 0,
      listTab: [
        "Foods",
        "Drinks"
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
            id: 1,
            name: "Nước mắt cá",
            img: tiger,
            price: 12,
            quantity: 0
          },
          {
            id: 2,
            name: "Mưa sao băng",
            img: tiger,
            price: 15,
            quantity: 0
          },
          {
            id: 3,
            name: "Nước biển đen",
            img: tiger,
            price: 18,
            quantity: 0
          }
        ]
      ]
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

  render() {
    const {
      tabCurrent,
      listMenu,
      listTab
    } = this.state;
    return (
      <div className="home-content">
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
                <p><button onClick={(e) => this.handleOrder(prod)}>Gọi đồ</button></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);