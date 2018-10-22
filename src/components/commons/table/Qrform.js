import React, { Component } from 'react';
import './../App.css';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class Qrform extends Component {

    closeForm=()=>{
        this.props.onClose();
    }

    onConfirm =()=>{
        var {table} = this.props;
        this.props.onConfirm(table);
        this.props.onClose();
    }
    render() {
        var React = require('react');
        var QRCode = require('qrcode.react');
        var {table} = this.props;
        return (
            <div>
                <div className="center mt-100">
                    <div className="panel panel-info align_center">
                        <div className="panel-heading">
                            <h3 className="panel-title">Thông tin đặt bàn {table.index}, mã đăng nhập : <h2>5433</h2></h3>
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
            dispatch(actions.closeQr());
        },
        onConfirm:(table)=>{
            dispatch(actions.changeTableStatus(table));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Qrform);
