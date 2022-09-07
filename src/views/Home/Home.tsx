import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Row, Space, Table } from "antd";
import { employeeType } from "../../types";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Column from "antd/lib/table/Column";
import useEmployee from "../../hooks/useEmployee";
import { Link } from "react-router-dom";
import { SINGLE_PATH_NO_ID } from "../../constants/path";
import ModalEmployee from "../../components/ModalEmployee/ModalEmployee";

export default function Home() {
  const [employeeList, setEmployeeList] = useState<employeeType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<employeeType>();
  const [isLoading, setIsLoading] = useState(false);

  const { getAllEmployees, deleteEmployee, editEmployee, addEmployee } =
    useEmployee();

  const fetchAllEmployees = async () => {
    setIsLoading(true);
    const em = await getAllEmployees();
    setEmployeeList(em);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllEmployees();
    // eslint-disable-next-line
  }, []);

  const confirmDelete = async (id: string) => {
    const res = await deleteEmployee(id);
    if (res) fetchAllEmployees();
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const onSubmit = async (values: employeeType) => {
    if (selectedEmployee) {
      setIsModalOpen(false);
      let res = await editEmployee(values);
      if (res) return fetchAllEmployees();
    }
    setIsModalOpen(false);
    let res = await addEmployee(values);
    if (res) fetchAllEmployees();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (record: employeeType) => {
    setIsModalOpen(true);
    setSelectedEmployee(record);
  };

  return (
    <div>
      <h2 className="text-center">
        <strong>Danh sách nhân viên</strong>
      </h2>
      <Row justify="end" style={{ marginBottom: "8px" }}>
        <Button type="primary" onClick={() => handleAdd()}>
          <PlusOutlined />
          Thêm
        </Button>
      </Row>
      <Table
        dataSource={employeeList}
        scroll={{ y: 500, x: 900 }}
        rowKey={(record) => record.id}
        loading={isLoading}
      >
        <Column
          title="Tên nhân viên"
          dataIndex="name"
          key="name"
          render={(text, record: employeeType, index) => (
            <Link to={`${SINGLE_PATH_NO_ID}/${record.id}`}>{text}</Link>
          )}
        />
        <Column title="Địa chỉ" dataIndex="address" key="address" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Số điện thoại" dataIndex="phone" key="phone" />
        <Column
          title="Action"
          dataIndex="action"
          key="action"
          render={(text, record: employeeType, index) => {
            return (
              <>
                <Space>
                  <Button onClick={() => handleEdit(record)}>
                    <EditOutlined />
                  </Button>
                  <Popconfirm
                    title="Are you sure to delete this?"
                    onConfirm={() => confirmDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            );
          }}
        />
      </Table>

      <ModalEmployee
        employee={selectedEmployee}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        setNullSelectedEmployee={() => setSelectedEmployee(undefined)}
        onSubmit={onSubmit}
      />
    </div>
  );
}
