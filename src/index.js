/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./components/Main";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
// import { createStore, combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
// import createSagaMiddleware from "@redux-saga/core";
// import { fork } from "redux-saga/effects";

// // Reducers
// import adminReducer from "./middleware/reducers/adminReducer";
// import vendorReducer from "./middleware/reducers/vendorReducer";
// import customerReducer from "./middleware/reducers/customerReducer";
import reducer from "./middleware/reducers/reducer";

// // Sagas
// import { completeSaga as adminSagas } from "./middleware/sagas/adminSaga";
// import { completeSaga as vendorSagas } from "./middleware/sagas/vendorSaga";
// import { completeSaga as customerSagas } from "./middleware/sagas/customerSaga";

// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";

// import AuthLayout from "./layouts/Auth";
// import RtlLayout from "./layouts/RTL";
// import AdminLayout from "./layouts/Admin.js";

import { FP } from "@fp-pro/client";
import fingerprint from "./Apis/fingerprint.ts";
// import "./assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

// const hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/rtl" component={RtlLayout} />
//       <Route path="/auth" component={AuthLayout} />
//       <Route path="/admin" component={AdminLayout} />
//       <Redirect from="/" to="/admin/dashboard" />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );

// Root Reducer
// const rootReducer = combineReducers({
//   adminReducer: adminReducer,
//   vendorReducer: vendorReducer,
//   customerReducer: customerReducer,
// });

// Creating Saga Middleware
// const sagas = createSagaMiddleware();

// Root Saga
// function* rootSaga() {
//   yield fork(adminSagas);
//   yield fork(vendorSagas);
//   yield fork(customerSagas);
// }

// Creating Redux Store With Saga
// const store = createStore(rootReducer, applyMiddleware(sagas));
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// sagas.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

FP.load({ client: "hubshub", region: "us" }).then((fp) => {
  fp.send().then((res) => localStorage.setItem("fingerprint", res));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
