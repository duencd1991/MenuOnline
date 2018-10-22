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

    return (
      <div>
        <div className="mt-100 ml-200 flex-container">
          {
            tables.map((table, index) => {
              return <Table key={table.id} index={index} table={table} />
            })
          }
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