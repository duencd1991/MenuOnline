import { tableTypes } from './../../constants/actionTypes';

export const sendIndex = (index) => {
  return {
    type: tableTypes.ACTION_SEND_INDEX,
    index
  }
}
export const listTable = () => {
  return {
    type: tableTypes.ACTION_LIST_TABLE
  }
}
export const changeTableStatus = (table) => {
  return {
    type: tableTypes.ACTION_CHANGE_TABLE_STATUS,
    table
  }
}
export const sendTable = (table) => {
  return {
    type: tableTypes.ACTION_SEND_TABLE,
    table
  }
}