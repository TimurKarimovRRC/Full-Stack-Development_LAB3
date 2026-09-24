import { useState } from "react";

import { Employees } from "./components/features/employees/Employees";
import { EmployeeForm } from "./components/features/employees/EmployeeForm";
import { Header } from "./components/layout/header/Header";
import { Footer } from "./components/layout/footer/Footer";

import departments from "./data/departments";

import type { Department } from "./types/department";
import type { Employee } from "./types/employee";

export default function App() {
    const [departmentList, setDepartmentList] =
        useState<Department[]>(departments);

    function addEmployee(
        employee: Employee,
        departmentName: string
    ) {
        setDepartmentList((currentDepartments) =>
            currentDepartments.map((department) => {
                if (department.name === departmentName) {
                    return {
                        ...department,
                        employees: [
                            ...department.employees,
                            employee,
                        ],
                    };
                }

                return department;
            })
        );
    }

    return (
        <>
            <Header />

            <Employees departments={departmentList} />

            <EmployeeForm
                departments={departmentList}
                onAddEmployee={addEmployee}
            />

            <Footer />
        </>
    );
}