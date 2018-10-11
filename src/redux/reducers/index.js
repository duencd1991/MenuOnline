import { combineReducers } from "redux";

import { alert } from "./alertReducer";
import { order } from "./orderReducer";
import { user } from "./usersReducer";

const rootReducer = combineReducers({
    alert,
    order,
    user
});

export default rootReducer;