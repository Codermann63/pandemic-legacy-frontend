import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {store} from "./app/store";
import { Provider } from "react-redux";
import { Counter } from "./features/counter/counter";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Counter />
      <App />
    </Provider>
  </React.StrictMode>
);
