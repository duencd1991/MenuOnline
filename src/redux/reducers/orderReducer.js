import { orderTypes } from "../../constants/actionTypes";

const initialState = {
  listOrder: [],
};

export function order(state = initialState, action) {
  switch (action.type) {
    case orderTypes.ADD_ORDER:
      let newList = state.listOrder.filter(item => item.id !== action.prod.id);
      newList.push(action.prod);
      return {
        listOrder: newList
      };
    case orderTypes.SUB_ORDER:
      return {
        listOrder: [...state.listOrder.filter(item => item.id !== action.prod.id), action.prod]
      };
    case orderTypes.CLEAR_ORDER:
      return {
        listOrder: []
      };
    default:
      return state
  }
}