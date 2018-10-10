import { orderTypes } from "../../constants/actionTypes";

const initialState = {
  listOrder: [],
  tableId: 0
};

export function order(state = initialState, action) {
  switch (action.type) {
    case orderTypes.ADD_ORDER:
      let update = false;
      let newList = [];
      Object.assign(newList, state.listOrder);
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id == action.prod.id) {
          newList[i].quantity = action.prod.quantity;
          update = true;
        }
      }
      if (!update) {
        newList.push(action.prod);
      }
      return {
        listOrder: newList,
        tableId: state.tableId
      };
    case orderTypes.SUB_ORDER:
      let sub = false;
      let subList = [];
      Object.assign(subList, state.listOrder);
      if (action.prod.quantity == 0) {
        subList = subList.filter(item => item.id !== action.prod.id);
      } else {
        for (let i = 0; i < subList.length; i++) {
          if (subList[i].id == action.prod.id) {
            subList[i].quantity = action.prod.quantity;
            sub = true;
          }
        }
        if (!sub) {
          subList.push(action.prod);
        }
      }
      return {
        listOrder: subList,
        tableId: state.tableId
      };
    case orderTypes.CLEAR_ORDER:
      return {
        listOrder: [],
        tableId: 0
      };
    case orderTypes.SET_TABLE:
      return {
        listOrder: state.listOrder,
        tableId: action.tableId
      }
    default:
      return state
  }
}