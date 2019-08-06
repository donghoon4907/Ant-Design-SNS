import React from "react";
import { Icon } from "antd";

const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh"
    }}
  >
    <Icon type="loading" loading="true" style={{ fontSize: 120 }} />
  </div>
);

export default Loading;
