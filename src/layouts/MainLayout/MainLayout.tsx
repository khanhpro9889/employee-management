import { Row } from "antd";
import React from "react";

type propsType = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: propsType) {
  return (
    <Row className="container horizontal-center vertical-center">
      <div className="wrapper">{children}</div>
    </Row>
  );
}
