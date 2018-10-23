import React, { Component } from "react";
import { connect } from 'react-redux';
import "./ViewTable.scss";
import Table from "../../components/commons/table/Table";

class ViewTable extends Component {

  constructor(props) {
    super(props);
    this.state={
        id:'',
        index:'',
        status:false,
        loginCode:-1,
        isDisplayQR:false,
        isDisplayInvoice:false
    }
  }

  onActionTable=(table)=>{
      this.setState({
        id:table.id,
        index:table.index,
        status:table.status,
        loginCode:table.loginCode,

      });
  }
  onCloseQr=(data)=>{
      this.setState({
        isDisplayQR:false
      });
  }
  
  onCloseInvoice=(data)=>{
    this.setState({
      isDisplayInvoice:false
    });
  }
  render() {
    const { tables } = this.props;
    var { isDisplayQR, isDisplayInvoice } = this.state;
    var table ={
      id:this.state.id,
      index:this.state.index,
      status:this.state.status,
      loginCode:this.state.loginCode,
    }
    return (
      <div>
        <div className="mlrt-200 flex-container">
          {
            tables.map((table, index) => {
              return <Table key={table.id} index={index} table={table} 
                            onActionTable ={this.props.onActionTable} 
                            onCloseQr={this.props.onCloseQr} 
                            onCloseInvoice={this.props.onCloseInvoice}
                            />
            })
          }
        </div>
        <div>
          {isDisplayQR ? <Qrform table={table}/> : ''}
        </div>
        <div>
          {isDisplayInvoice ? <InvoiceForm  table={table}/> : ''}
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