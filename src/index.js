import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";

const start = (data, node) => {
    ReactDOM.render(<App 
                        appCode={data.appCode}
                        DBTier={data.DBTier}
                        baseURL={data.baseURL}
                    />, 
                    node);
}

export { start };