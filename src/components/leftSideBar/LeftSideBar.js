import React, { Component } from "react";
import "./LeftSideBar.scss";

export default class LeftSideBar extends Component {

  handleLogOut = () => {
    this.props.dispatch(userActions.logout());
  };

  handleRedirectPage = (nextPage) => {
    this.props.history.push(nextPage);
  }

  render() {
    const isAdmin = true;
    return (
      <div className="left-side-bar">
        <ul>
          <a onClick={(e) => this.handleRedirectPage("/Menu1")}>
            <li className="item-menu">
              <i className="fas fa-home"></i>
              <span className="menu">Menu1&nbsp;&nbsp;&nbsp;</span>
            </li>
          </a>
          <a onClick={(e) => this.handleRedirectPage("/Menu2")}>
            <li className="item-menu">
              <i className="fas fa-door-open"></i>
              <span className="menu">Menu2&nbsp;&nbsp;&nbsp;</span>
            </li>
          </a>
          <a onClick={(e) => this.handleRedirectPage("/Menu3")}>
            <li className="item-menu">
              <i className="fas fa-coffee"></i>
              <span className="menu">Menu3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </li>
          </a>
          {
            isAdmin && <a>
              <li id="explan-menu" className="item-menu dropdown">
                <i className="fas fa-walking"></i>
                <span className="menu">Admin</span>
                <i className="fas fa-angle-down ic-down"></i>
                <ul className="sub-menu">
                  <li onClick={(e) => this.handleRedirectPage("/Admin1")}>
                    <span>Admin1</span>
                  </li>
                  <li onClick={(e) => this.handleRedirectPage("/Admin2")}>
                    <span>Admin2</span>
                  </li>
                  <li onClick={(e) => this.handleRedirectPage("/Admin2")}>
                    <span>Admin3</span>
                  </li>
                </ul>
              </li>
            </a>
          }
        </ul>
      </div>
    );
  }
}