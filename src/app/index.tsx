import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { withProviders } from "./providers";
import "./styles/global.scss";

const ProvidersApp = withProviders(App);

ReactDOM.render(
  <React.StrictMode>
    <ProvidersApp />
  </React.StrictMode>,
  document.getElementById("root"),
);
