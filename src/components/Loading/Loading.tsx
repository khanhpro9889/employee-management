import React from "react";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div
      style={{ height: "100vh" }}
      className="horizontal-center vertical-center"
    >
      <Spin size="large" />
    </div>
  );
}
