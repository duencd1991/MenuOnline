import React, { Component } from "react";
import { connect } from 'react-redux';
import "./ViewTable.scss";
import Table from "../../components/commons/table/Table";

class ViewTable extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { tables } = this.props;
    var QRCode = require('qrcode.react');
    return (
      <div>
        <div className="mlrt-200 flex-container">
          {
            tables.map((table, index) => {
              return <Table key={table.id} index={index} table={table} />
            })
          }
        </div>
        <div>
          <div className="center mt-100">
            <div className="panel panel-info align_center">
              <div className="panel-heading">
                <h3 className="panel-title">Thông tin đặt bàn 1, mã đăng nhập : <h2>5433</h2></h3>
              </div>
              <div className="panel-body">
                <div>
                  <QRCode value="http://facebook.github.io/react/" />
                </div>
              </div>
            </div>
             <button type="button" className="btn btn-danger align_right" onClick={this.closeForm}>Đóng</button> &nbsp;
             <button type="button" className="btn btn-success align_right" onClick={this.onConfirm}>Xác nhận</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tables: state.listTables
  }
}
export default connect(mapStateToProps, null)(ViewTable);