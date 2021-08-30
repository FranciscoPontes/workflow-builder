import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";

const start = (appCode, node) => {
    ReactDOM.render(<App appCode={appCode}/>, node);
}

export { start };