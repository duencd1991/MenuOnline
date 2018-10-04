import { orderTypes } from "../../constants/actionTypes";
export const orderActions = {
  addOrder,
  subOrder,
  clearOrder
};

export function addOrder(prod) {
  return { type: orderTypes.ADD_ORDER, prod };
}

export function subOrder(prod) {
  return { type: orderTypes.SUB_ORDER, prod };
}

export function clearOrder() {
  return { type: orderTypes.CLEAR_ORDER };
}