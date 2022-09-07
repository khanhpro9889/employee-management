import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Space } from "antd";
import React, { useEffect } from "react";
import { employeeType } from "../../types";

type propsType = {
  employee: employeeType | null;
  setNullSelectedEmployee?: () => void;
  onSubmit: (values: employeeType) => void;
  handleCancel: () => void;
};

export default function FormEmployee({
  employee,
  setNullSelectedEmployee,
  onSubmit,
  handleCancel,
}: propsType) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: employee?.name,
      address: employee?.address,
      phone: employee?.phone,
      email: employee?.email,
    });
    // eslint-disable-next-line
  }, [employee]);

  const onFinish = (values: any) => {
    onSubmit({ ...values, id: employee?.id });
    form.resetFields();
    if (setNullSelectedEmployee) setNullSelectedEmployee();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên nhân viên"
        name="name"
        rules={[{ required: true, message: "Hãy nhập tên!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: "Hãy nhập địa chỉ!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Hãy nhập email!" },
          {
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Hãy nhập đúng định dạng",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Hãy nhập số điện thoại!" },
          {
            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            message: "Hãy nhập đúng định dạng",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Row justify="end">
        <Space>
          <Button onClick={() => handleCancel()}>Trở về</Button>
          <Button type="primary" htmlType="submit">
            <EditOutlined />
            {employee ? "Sửa" : "Thêm"}
          </Button>
        </Space>
      </Row>
    </Form>
  );
}
