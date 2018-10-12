import { makeGetRequest, makePostRequest, makeDeleteRequest } from "../../../../utils/cuiResource";

let listCatalog = [
  {
    id: 1,
    title: "Đồ ăn"
  },
  {
    id: 2,
    title: "Đồ uống"
  },
  {
    id: 3,
    title: "Đồ ăn nhanh"
  }
]

export function getListCatalog(successCallback, failCallback) {
  successCallback({
    message: "Success",
    isSuccess: true,
    data: listCatalog
  })
}

export function getListCatalogLimit(pageSize, successCallback, failCallback) {
  successCallback({
    message: "Success",
    isSuccess: true,
    data: listCatalog
  })
}

export function getCatalog(id, successCallback, failCallback) {
  successCallback({
    message: "Success",
    isSuccess: true,
    data: listCatalog.filter(item => item.id == id)
  });
}

export function createCatalog(data, successCallback, failCallback) {
  listCatalog.push(data);
  successCallback({
    message: "Success",
    isSuccess: true
  });
}

export function updateCatalog(catalogId, data, successCallback, failCallback) {
  for(let i = 0; i < listCatalog.length; i ++) {
    if (listCatalog[i].id == catalogId) {
      listCatalog[i].title = data.title;
    }
  }
  successCallback({
    message: "Success",
    isSuccess: true
  });
}

export function deleteCatalog(id, successCallback, failCallback) {
  listCatalog = listCatalog.filter(item => item.id != id);
  successCallback({
    message: "Success",
    isSuccess: true
  });
}
