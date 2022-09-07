import { Modal } from "antd";
import React from "react";
import { employeeType } from "../../types";
import FormEmployee from "../Form/FormEmployee";

type propsType = {
  employee: employeeType | undefined;
  isModalOpen: boolean;
  handleCancel: () => void;
  onSubmit: (values: employeeType) => void;
  setNullSelectedEmployee?: () => void;
};

export default function ModalEmployee({
  employee,
  isModalOpen,
  handleCancel,
  onSubmit,
  setNullSelectedEmployee,
}: propsType) {
  return (
    <Modal
      title={<strong>{employee ? "Chỉnh sửa" : "Thêm"} nhân viên</strong>}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <FormEmployee
        handleCancel={handleCancel}
        onSubmit={onSubmit}
        employee={employee}
        setNullSelectedEmployee={setNullSelectedEmployee}
      />
    </Modal>
  );
}
