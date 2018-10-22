import { combineReducers } from "redux";

import { alert } from "./alertReducer";
import { order } from "./orderReducer";
import { user } from "./usersReducer";
import { listTables } from "./tableReducer";

const rootReducer = combineReducers({
    alert,
    order,
    user,
    listTables
});

export default rootReducer;