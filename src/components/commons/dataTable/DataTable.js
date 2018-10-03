import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./DataTable.scss";
import Checkbox from "../checkbox/Checkbox";

export default class DataTable extends Component {

  handleCheckbox = (value, checked) => {
    this.props.onSelect(value, checked);
  }

  onClickCheckbox = (id) => {
    if ($(id)) {
      $(id).click();
    }
  }

  render() {
    const data = this.props.data;
    let columns = [];
    if (data.length > 0) {
      for (var i in data[0]) {
        columns.push(i);
      }
    }

    return (
      <div className="data-table">
        <div className="d-flex">

          <div className="mr-auto">
            {
              this.props.listDropdown1 && <div className="btn-group">
                <div className="table-sort-label">{this.props.titleDropdown1}</div>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {
                    this.props.selectedDropdown1 ? this.props.selectedDropdown1.title : this.props.titleDropdown1
                  }
                </button>
                <div className="dropdown-menu">
                  {
                    this.props.listDropdown1 && this.props.listDropdown1.map((obj1, index) => {
                      return <a key={index} className="dropdown-item" onClick={() => this.props.onSelectDropdown1(obj1)}>{obj1.title}</a>
                    })
                  }
                </div>
              </div>
            }
            {
              this.props.listDropdown2 && <div className="btn-group">
                <div className="table-sort-label mr-left">{this.props.titleDropdown2}</div>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  {
                    this.props.selectedDropdown2 ? this.props.selectedDropdown2.title : this.props.titleDropdown2
                  }
                </button>
                <div className="dropdown-menu">
                  {
                    this.props.listDropdown2 && this.props.listDropdown2.map((obj2, index) => {
                      return <a key={index} className="dropdown-item" onClick={() => this.props.onSelectDropdown2(obj2)}>{obj2.title}</a>
                    })
                  }
                </div>
              </div>
            }
          </div>
          {
            this.props.titleDropdown1 == "Select home" && this.props.selected.length > 0 && <div className="col">
              <button type="button" className="btn btn-genQR" onClick={(e) => this.props.handleGenQRCode("a4")}>
                Gen QRCode A4
              </button>
              <button
                type="button" className="btn btn-genQR" onClick={(e) => this.props.handleGenQRCode("a3")}>
                Gen QRCode A3
              </button>
              {
                this.props.handleGenQRCheckin && this.props.selected.length == 1 && <button
                  type="button" className="btn btn-genQR" onClick={this.props.handleGenQRCheckin}>
                  Gen QRCheckIn
                </button>}
              {
                this.props.handleGenCheckinGuideline && this.props.selected.length == 1 && <button
                  type="button" className="btn btn-genQR" onClick={this.props.handleGenCheckinGuideline}>
                  Gen Guideline
                </button>}
            </div>
          }

          <div className="table-sort-label">Sort by</div>
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownRows" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.props.pageSize + " rows"}
            </button>
            <div className="dropdown-menu dropdown-menu-right select-row" aria-labelledby="dropdownRows">
              <a className="dropdown-item" onClick={(e) => this.props.onChangePageSize(5)}>5 rows</a>
              <a className="dropdown-item" onClick={(e) => this.props.onChangePageSize(10)}>10 rows</a>
              <a className="dropdown-item" onClick={(e) => this.props.onChangePageSize(15)}>15 rows</a>
              <a className="dropdown-item" onClick={(e) => this.props.onChangePageSize(20)}>20 rows</a>
            </div>
          </div>
        </div>
        <table className="cus-table">
          <tbody>
            <tr>
              <th>
                <Checkbox title="ALL" value="ALL" checked={this.props.selected.length == data.length && data.length > 0} onChange={this.handleCheckbox} />
              </th>
              {
                columns.length > 0 && columns.map((item, index) => {
                  if (item != "Id") {
                    return <th key={index}>{item.toUpperCase()}</th>
                  }
                })
              }
              <th></th>
            </tr>
            {
              data.length > 0 && data.map((item, index) => {
                let checked = false;
                for (let i = 0; i < this.props.selected.length; i++) {
                  if (this.props.selected[i].Id == item.Id) {
                    checked = true;
                  }
                }
                return <tr key={index} onClick={(e) => this.onClickCheckbox(`#checkbox-${index}`)}>
                  <td>
                    <Checkbox disable={true} id={`checkbox-${index}`} value={index} checked={checked} onChange={this.handleCheckbox} />
                  </td>
                  {
                    columns.length > 0 && columns.map((head, index) => {
                      if (head == "Id") {
                        return null;
                      }
                      if (head == "Image") {
                        return <td key={index}>
                          {
                            item.Image.map((img, index) => {
                              if (index < 3) {
                                return <img key={index} src={img} />
                              }
                            })
                          }
                        </td>
                      } else {
                        return <td key={index}>
                          {item[head]}
                        </td>
                      }
                    })
                  }
                  {
                    this.props.onDeleteOne && this.props.onUpdate && <td>
                      <div className="action">
                        <i className="fas fa-edit" onClick={(e) => this.props.onUpdate(item)}></i>
                        <i className="fas fa-trash-alt" onClick={(e) => this.props.onDeleteOne(item)}></i>
                      </div>
                      <div></div>
                    </td>
                  }
                </tr>
              })
            }

          </tbody>
        </table>
        {
          data.length == 0 && <div className="box-nocontent">
            Select <a>Add New</a> to add new
          </div>
        }
        {
          this.props.selected.length > 0 && this.props.onDelete && <button type="button" className="btn btn-danger ml-2" onClick={this.props.onDelete}>
            <i className="fa fa-trash-o" aria-hidden="true" onClick={this.props.onDelete} /> Delete selected
        </button>
        }
      </div>
    );
  }
}
DataTable.propTypes = {
  data: PropTypes.array,
  selected: PropTypes.array,
  pageSize: PropTypes.number,
  titleDropdown1: PropTypes.string,
  titleDropdown2: PropTypes.string,
  selectedDropdown1: PropTypes.object,
  selectedDropdown2: PropTypes.object,
  listDropdown1: PropTypes.array,
  listDropdown2: PropTypes.array,
  onSelectDropdown1: PropTypes.func,
  onSelectDropdown2: PropTypes.func,
  onSelect: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteOne: PropTypes.func,
  onChangePageSize: PropTypes.func,
  handleGenQRCode: PropTypes.func
};