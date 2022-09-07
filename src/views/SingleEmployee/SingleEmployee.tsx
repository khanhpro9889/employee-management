import { Button, message, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEmployee from "../../hooks/useEmployee";
import { employeeType } from "../../types";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../../constants/path";
import { EditOutlined } from "@ant-design/icons";
import ModalEmployee from "../../components/ModalEmployee";
export default function SingleEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleEmployee } = useEmployee();
  const [employee, setEmployee] = useState<employeeType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { editEmployee } = useEmployee();

  const fetchSingleEmployee = async (id: string) => {
    const em = await getSingleEmployee(id);
    setEmployee(em);
  };

  useEffect(() => {
    if (id) {
      fetchSingleEmployee(id);
    }
  }, [id]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (values: employeeType) => {
    if (id)
      try {
        editEmployee(values);
        fetchSingleEmployee(id);
        message.success("Sửa thành công!");
      } catch (error) {
        message.success("Có lỗi xảy ra");
      }
    return setIsModalOpen(false);
  };

  return (
    <div>
      {employee && (
        <Space direction="vertical" size={[8, 16]}>
          <div>
            <h3>Họ và tên:</h3> {employee.name}
          </div>
          <div>
            <h3>Địa chỉ:</h3> {employee.address}
          </div>
          <div>
            <h3>Email:</h3> {employee.email}
          </div>
          <div>
            <h3>Số điện thoại:</h3> {employee.phone}
          </div>
          <Row>
            <Space>
              <Button onClick={() => navigate(HOME_PATH, { replace: true })}>
                Trở về
              </Button>
              <Button type="primary" onClick={() => setIsModalOpen(true)}>
                <EditOutlined />
                Sửa
              </Button>
            </Space>
          </Row>
        </Space>
      )}
      <ModalEmployee
        employee={employee}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        onSubmit={onSubmit}
      />
    </div>
  );
}
