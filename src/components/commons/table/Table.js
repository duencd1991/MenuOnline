import React, { Component } from 'react';
import "./Table.scss";
import { sendIndex, sendTable} from './../../../redux/actions/tableActions';
import { connect } from 'react-redux';

const tableStyle = {
  width: 20 + 'rem'
}
class Table extends Component {

  onOrder = () => {
    if (!this.props.table.status) {
      alert('Hiện tại bàn ' + this.props.table.index + ' đang bận !');
    } else {
      var { table } = this.props;
      this.props.onSendTable(table);
      this.props.onCloseInvoice();
      this.props.onShowQr();
    }
  }

  onCheckout = () => {
    if (this.props.table.status) {
      alert('Hóa đơn bàn ' + this.props.table.index + ' không tồn tại !');
    } else {
      var { table } = this.props;
      this.props.onSendTable(table);
      this.props.onCloseQr();
      this.props.onShowInvoice();
    }

  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {

    }
  }
  render() {
    var { table } = this.props;
    console.log(table);
    return (
      <div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 mt-30">
          <div className={table.status === true ? "card text-white bg-success" : "card text-white bg-secondary"}>
            <div className="card-body">
              <h4 className="card-title">Bàn {table.index}</h4>
              <button className="btn btn-primary" onClick={this.onOrder}>Đặt bàn</button> &nbsp;
              <button className="btn btn-primary" onClick={this.onCheckout}>Thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSendIndex: (index) => {
      dispatch(sendIndex(index));
    },
    onSendTable: (table) => {
      dispatch(sendTable(table));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Table);
