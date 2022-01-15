import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

let _endpoints;

const setEndpoints = (endpoints) => {
  _endpoints = endpoints;
};

const useEndpoints = () => _endpoints;

const start = (data, node) => {
  ReactDOM.render(
    <Provider store={store}>
      <App appData={data} />
    </Provider>,
    node
  );
};

export { start, setEndpoints, useEndpoints };
