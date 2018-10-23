import React, { Component } from 'react';
import Invoice from './Invoice';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class InvoiceForm extends Component {
    onClose =()=>{
        this.props.onClose();
    }

    onPrintInvoice =()=>{
        var {table} = this.props;
        this.props.onPrintInvoice(table);
        this.props.onClose();
    }
    render() {
        var {table} = this.props;
        return (
            <div>
                <div className="center mt-100">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <h3 className="panel-title align_center">Hóa đơn bàn {table.index}</h3>
                        </div>
                        <div className="panel-body align_left">
                            <Invoice />
                        </div>
                    </div>
                    <button type="button" className="btn btn-danger align_right" onClick={this.onClose}>Đóng</button> &nbsp;
                    <button type="button" className="btn btn-success align_right" onClick={this.onPrintInvoice}>In Hóa Đơn</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        table: state.sendTable
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onClose: () => {
            dispatch(actions.closeInvoice());
        },
        onPrintInvoice:(table)=>{
            dispatch(actions.changeTableStatus(table));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(InvoiceForm);