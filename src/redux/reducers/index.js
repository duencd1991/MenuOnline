import { combineReducers } from "redux";

import { alert } from "./alertReducer";
import { order } from "./orderReducer"

const rootReducer = combineReducers({
    alert,
    order
});

export default rootReducer;