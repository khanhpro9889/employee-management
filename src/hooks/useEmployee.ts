import { message } from "antd";
import { employeeType } from "../types";

const url = "http://localhost:3000/employees";
type GET = "GET";
type POST = "POST";
type PATCH = "PATCH";
type PUT = "PUT";
type DELETE = "DELETE";

type methodType = GET | POST | PUT | PATCH | DELETE;

const customFetch = async (url: string, method: methodType, body?: any) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export default function useEmployee() {
  const getAllEmployees = async () => {
    try {
      const employees = await customFetch(url, "GET");
      return employees;
    } catch (error) {
      message.error("Có lỗi xảy ra!");
      return [];
    }
  };

  const getSingleEmployee = async (id: string) => {
    try {
      const employee = await customFetch(`${url}/${id}`, "GET");
      message.success("Thành công!");
      return employee;
    } catch (error) {
      message.error("Có lỗi xảy ra!");
      return null;
    }
  };

  const addEmployee = async (values: employeeType) => {
    try {
      const res = await customFetch(url, "POST", values);
      message.success("Thành công!");
      return res;
    } catch (error) {
      message.error("Có lỗi xảy ra!");
      return false;
    }
  };

  const editEmployee = async (values: employeeType) => {
    try {
      const res = await customFetch(`${url}/${values.id}`, "PATCH", values);
      message.success("Thành công!");
      return res;
    } catch (error) {
      message.error("Có lỗi xảy ra!");
      return false;
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const res = await customFetch(`${url}/${id}`, "DELETE");
      message.success("Thành công!");
      return res;
    } catch (error) {
      message.error("Có lỗi xảy ra!");
      return false;
    }
  };

  return {
    getAllEmployees,
    getSingleEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee,
  };
}
