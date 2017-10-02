import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import exhibition from "./Exhibition";

export default combineReducers({
  router: routerReducer,
  exhibition
});
