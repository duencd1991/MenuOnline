import React, { Component } from "react";
import "./Header.scss";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions";

class HeaderAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ""
    }
  }

  handleLogOut = () => {
    this.props.dispatch(userActions.logout());
    this.props.history.push("/Login");
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn !== this.props.loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.setState({
          username: user.name
        })
      } else {
        this.setState({ username: "" });
      }
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setState({
        username: user.name
      })
    } else {
      this.setState({ username: "" });
    }
  }

  render() {
    let urlPage = window.location.pathname.toLowerCase();
    return (
      <div className="header-session d-flex">
        <div className="branch-box mr-auto">
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const products = state.products;
  return {
    products
  };
};

export default connect(mapStateToProps, null)(HeaderAdmin);