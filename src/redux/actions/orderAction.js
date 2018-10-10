import { orderTypes } from "../../constants/actionTypes";
export const orderActions = {
  addOrder,
  subOrder,
  clearOrder,
  setTableOrder
};

export function setTableOrder(tableId) {
  return { type: orderTypes.SET_TABLE, tableId};
}

export function addOrder(prod) {
  return { type: orderTypes.ADD_ORDER, prod };
}

export function subOrder(prod) {
  return { type: orderTypes.SUB_ORDER, prod };
}

export function clearOrder() {
  return { type: orderTypes.CLEAR_ORDER };
}