import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";

const start = (data, node) => {

    console.log(data);
    ReactDOM.render(<App data={data} />, node);
}

export { start };