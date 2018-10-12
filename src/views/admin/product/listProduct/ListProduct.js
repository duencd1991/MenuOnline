import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../App.scss';
import * as services from '../services/ProductService';
import * as CatalogServices from "../../category/services/CatalogService";
import { success, error, clear } from './../../../../redux/actions';
import { PAGE_SIZE } from '../../../../constants/commonConstant';
import DataTable from "../../../../components/commons/dataTable/DataTable";
import Pagination from "react-js-pagination";

class ListFoodDrink extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemSelected: [],
      data: [],
      listCatalog: [],
      selectedCatalog: null,
      currentPage: 1,
      totalItems: 1,
      pageSize: PAGE_SIZE
    };
  }

  handlePageChange = (pageNum) => {
    this.setState({
      currentPage: pageNum
    })
  }

  componentWillMount() {
    this.getListCatalog();
    this.getListProduct();
  }

  componentDidUpdate(preProps, preState) {
    if (preState.currentPage !== this.state.currentPage || this.state.selectedCatalog != preState.selectedCatalog) {
      this.getListProduct();
    }
  }

  getListCatalog = () => {
    CatalogServices.getListCatalog(response => {
      if(response.isSuccess) {
        this.setState({
          listCatalog: response.data,
          selectedCatalog: response[0]
        })
      }
    }, error => {
      alert(error);
    })
  };

  getListProduct = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let pageSize = (this.state.currentPage - 1) * PAGE_SIZE;
    services.getListProductByCatalog(this.state.selectedCatalog, pageSize, response => {
      if (response.isSuccess) {
        let list = [];
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          const item = {
            Id: data[i].id,
            Title: data[i].title,
            Images: data[i].images,
            Price: data[i].price,
            Catalog: data[i].catalog
          };
          list.push(item);
        }
        this.setState({
          data: list
        })
      } else {
        alert(response.message);
      }
    }, error => {
      alert(error);
    })
  }

  handleChangePageSize = (pageSize) => {
    this.setState({
      pageSize: pageSize
    })
  }

  handleSelectItem = (value, isSelected) => {
    if (value == "ALL") {
      this.setState({
        itemSelected: isSelected ? this.state.data : []
      })
    } else {
      if (isSelected) {
        this.setState({
          itemSelected: [...this.state.itemSelected, this.state.data[value]]
        })
      } else {
        this.setState({
          itemSelected: this.state.itemSelected.filter(item => item.Id !== this.state.data[value].Id)
        })
      }
    }
  }

  handleAddProduct = () => {
    this.props.history.push("/CreateProduct");
  };

  handleEditProduct = (item) => {
    if (item) {
      this.props.history.push("/UpdateProduct?" + item.Id);
    }
  };

  handleConfirmDelete = () => {
    if (this.state.itemSelected.length <= 0) {
      this.props.error("Please select at least one product for delete!");
    } else {
      document.getElementById('confirm-modal').click();
    }
  };

  handleDelete = (item) => {
    if (item) {
      services.deleteFoodDrink(item.Id, response => {
        this.props.success("Delete success: " + item.Title);
        this.getListProduct();
      })
    } else {
      let countDelete = 0;
      let countApi = 0;
      const selected = this.state.itemSelected;
      for (let i = 0; i < selected.length; i++) {
        services.deleteFoodDrink(selected[i].Id, response => {
          countApi += 1;
          if (response.data.isSucess) {
            countDelete += response.data.data.count;
            this.setState({
              itemSelected: selected.filter(item => item.Id !== selected[i].Id)
            })
          }

          if (countApi === selected.length) {
            this.props.success("Delete success " + countDelete + " products");
            this.getListProduct();
          }
        }, error => {
          countApi += 1;

          if (countApi === selected.length) {
            this.props.success("Delete success " + countDelete + " products");
            this.getListProduct();
          }
        });
      }
    }
  };

  onSelectCatalog = (catalog) => {
    this.setState({
      selectedCatalog: catalog
    });
  };

  render() {
    const products = this.props.products;
    return (
      <div className="admin-container">
        <div className="list-page">
          <div className="d-flex">
            <div className="mr-auto">
              <div className="admin-title">Danh sách sản phẩm</div>
              <div className="admin-sub-title">Trang quản lý sản phẩm</div>
            </div>
            <div className="d-flex align-items-center">
              <div className="inner-addon right-addon">
                <input className="form-control search-box" placeholder="Search" type="text" />
                <i className="ic-search fas fa-search"></i>
              </div>
              <button className="btn-add-new" onClick={this.handleAddProduct}><i className="fas fa-plus"></i> &nbsp; Thêm mới</button>
            </div>
          </div>

          <DataTable data={this.state.data} selected={this.state.itemSelected} pageSize={this.state.pageSize}
            titleDropdown1="Chọn catalog"
            listDropdown1={this.state.listCatalog}
            selectedDropdown1={this.state.selectedCatalog}
            onSelectDropdown1={this.onSelectCatalog}
            onChangePageSize={this.handleChangePageSize}
            onSelect={this.handleSelectItem}
            onUpdate={this.handleEditProduct}
            onDelete={this.handleConfirmDelete}
            onDeleteOne={this.handleDelete} />

          <div className="d-flex flex-row-reverse">
            <Pagination
              firstPageText={<i className="fas fa-angle-double-left"></i>}
              lastPageText={<i className="fas fa-angle-double-right"></i>}
              prevPageText={<i className="fas fa-angle-left"></i>}
              nextPageText={<i className="fas fa-angle-right"></i>}
              activePage={this.state.currentPage}
              itemsCountPerPage={PAGE_SIZE}
              totalItemsCount={this.state.totalItems}
              onChange={this.handlePageChange}
            />
          </div>

          <button id="confirm-modal" type="button" className="hidden-link" data-toggle="modal" data-target="#confirmModal" />
          <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="confirmModalLabel">Notification</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <span>Do you want to delete the selected product?</span>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const products = state.products;
  return {
    products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: (message) => {
      dispatch(error(message));
    },
    success: (message) => {
      dispatch(success(message));
    },
    clear: () => {
      dispatch(clear());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFoodDrink); 