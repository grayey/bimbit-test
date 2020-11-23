import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";



const RootReducer = combineReducers({ // add my reducers
    login: LoginReducer,
});
  
export default RootReducer;