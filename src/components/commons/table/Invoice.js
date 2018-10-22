import React, { Component } from 'react';
import './../App.css';
class Invoice extends Component {
    render() {
        return (
            <div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Thứ tự</th>
                            <th>Tên món ăn</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Voi luộc cả con</td>
                            <td>3</td>
                            <td>1500 $</td>
                            <td>4500$</td>
                        </tr>
                    </tbody>
                </table>
                <p>Tổng tiền : </p>
                <p>Ngày ....... tháng ....... năm 20......</p>
            </div>
        );
    }
}

export default Invoice;