import React, { Component } from "react";
import "./App.scss";
import Routes from '../src/Routes';
import HeaderAdmin from "./components/header/HeaderAdmin";
import Footer from "../src/components/footer/Footer";
import { history } from '../src/helper';
import { connect } from "react-redux";
import LeftSideBar from "./components/leftSideBar/LeftSideBar";
import { Modal, Button } from 'react-bootstrap';
import { clear } from "../src/redux/actions";

class App extends Component {

  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.clear();
    });
  }

  closeAlert = () => {
    this.props.clear();
  }

  render() {
    const { alert } = this.props;
    let urlPage = window.location.pathname.toLowerCase();

    let hiddenLeftMenu = true;
    let hiddenHeader = true;
    if (urlPage === "/admin") {
      hiddenLeftMenu = false;
    }
    if (urlPage === "/admin") {
      hiddenHeader = false;
    }
    return (
      <div className={hiddenLeftMenu ? hiddenHeader ? "body-container hidden-header hidden-left-menu" : "body-container hidden-left-menu" : "body-container"}>
        {
          !hiddenHeader && <HeaderAdmin history={history} />
        }
        <div className="wrapper">
          {
            !hiddenLeftMenu && <LeftSideBar history={history} />
          }
          {
            alert.message && <Modal.Dialog onHide={this.closeAlert}>
              <Modal.Header>
                <div>Notification</div>
              </Modal.Header>
              <Modal.Body>
                <div dangerouslySetInnerHTML={{ __html: alert.message }}></div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-primary" onClick={this.closeAlert}>Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          }
          <div id="content">
            <Routes history={history} />
          </div>
          <Footer history={history}/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.alert,
  order: state.order
});

const mapDispatchToProps = dispatch => {
  return {
    clear: () => {
      dispatch(clear());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);