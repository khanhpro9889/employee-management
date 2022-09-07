import React from "react";
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
    const employees = await customFetch(url, "GET");
    return employees;
  };

  const getSingleEmployee = async (id: string) => {
    const employee = await customFetch(`${url}/${id}`, "GET");
    return employee;
  };

  const addEmployee = async (values: employeeType) => {
    const res = await customFetch(url, "POST", values);
    return res;
  };

  const editEmployee = async (values: employeeType) => {
    const res = await customFetch(`${url}/${values.id}`, "PATCH", values);
    return res;
  };

  const deleteEmployee = async (id: string) => {
    const res = await customFetch(`${url}/${id}`, "DELETE");
    return res;
  };

  return {
    getAllEmployees,
    getSingleEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee,
  };
}
