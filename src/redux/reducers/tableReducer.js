import { tableTypes } from './../../constants/actionTypes';


var randomstring = require("randomstring");
var initState = [
  {
    id: randomstring.generate(),
    index: 1,
    status: false,
    loginCode: -1
  },
  {
    id: randomstring.generate(),
    index: 2,
    status: true,
    loginCode: -1
  },
  {
    id: randomstring.generate(),
    index: 3,
    status: false,
    loginCode: -1
  },
  {
    id: randomstring.generate(),
    index: 4,
    status: false,
    loginCode: -1
  },
  {
    id: randomstring.generate(),
    index: 5,
    status: true,
    loginCode: -1
  },
  {
    id: randomstring.generate(),
    index: 6,
    status: false,
    loginCode: -1
  },
  {
    id: randomstring.generate(),
    index: 7,
    status: true,
    loginCode: -1
  },
  {
    id: randomstring.generate(),
    index: 8,
    status: false,
    loginCode: -1
  },
  {
    id: randomstring.generate(),
    index: 9,
    status: true,
    loginCode: -1
  }
];

export function listTables(state = initState, action) {
  switch (action.type) {
    case tableTypes.ACTION_LIST_TABLE:
      return state;
    case tableTypes.ACTION_CHANGE_TABLE_STATUS:
      console.log(action);
      var result = -1;
      state.forEach((table, index) => {
        if (table.id === action.table.id) {
          result = index;
        }
      });
      console.log(result);
      var table = { ...state[result] };
      var tmpTables = [...state];
      console.log(table);
      table.status = !table.status;
      tmpTables[result] = table;
      state = tmpTables;
      console.log(state);
      return [...state];
    default: return state;
  }
}