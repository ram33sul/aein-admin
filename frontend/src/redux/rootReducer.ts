import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducer";

const rootReducer = combineReducers({
    admin: adminReducer
})

export default rootReducer;