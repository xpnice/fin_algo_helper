import React from "react";
import { ConfigProvider } from "antd";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/index";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ConfigProvider
  // 个性化antd组件样式
    theme={{
      token: {
        // colorPrimary: "#00b96b"
      },
    }}
  >
    <App />
  </ConfigProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
