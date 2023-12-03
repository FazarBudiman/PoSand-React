import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { dataStore } from "./redux/DataStore.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={dataStore}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#063b86",
            colorInfo: "#063b86",
            colorSuccess: "#3a9f08",
            colorWarning: "#c88706",
            colorError: "#b20709",
            colorLink: "#000000",
            borderRadius: 9,
            wireframe: false,
          },
          components: {
            Layout: {
              siderBg: "#FFAE10",
            },
            Menu: {
              itemBg: "#FFAE10",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
