import { makeGetRequest, makePostRequest, makeDeleteRequest } from "../../../../utils/cuiResource";
import imgDefault from "../../../../../public/images/default.jpg";

let listProduct = [
  {
    id: "1",
    title: "Cơm rang",
    price: 35,
    images: imgDefault,
    catalog: "1"
  },
  {
    id: "2",
    title: "Phở Hà Nội",
    price: 30,
    images: imgDefault,
    catalog: "1"
  },
  {
    id: "3",
    title: "Vịt quay",
    price: 160,
    images: imgDefault,
    catalog: "1"
  }
]

export function getListProductByCatalog(catalog, pageSize, successCallback, failCallback) {
  successCallback({
    message: "Success",
    isSuccess: true,
    data: listProduct
  })
}

export function getProduct(id, successCallback, failCallback) {
  successCallback({
    message: "Success",
    isSuccess: true,
    data: listProduct.filter(item => item.id == id)
  });
}

export function createProduct(data, successCallback, failCallback) {
  listProduct.push(data);
  successCallback({
    message: "Success",
    isSuccess: true
  });
}

export function updateProduct(productId, data, successCallback, failCallback) {
  for(let i = 0; i < listProduct.length; i ++) {
    if (listProduct[i].id == productId) {
      listProduct[i].title = data.title;
      listProduct[i].price = data.price;
      listProduct[i].images = data.images;
      listProduct[i].catalog = data.catalog;
    }
  }
  successCallback({
    message: "Success",
    isSuccess: true
  });
}

export function deleteProduct(id, successCallback, failCallback) {
  listProduct = listProduct.filter(item => item.id != id);
  successCallback({
    message: "Success",
    isSuccess: true
  });
}
