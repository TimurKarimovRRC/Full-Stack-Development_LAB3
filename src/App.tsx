import { useState } from "react";

import { Employees } from "./components/features/employees/Employees";
import { EmployeeForm } from "./components/features/employees/EmployeeForm";
import { Header } from "./components/layout/header/Header";
import { Footer } from "./components/layout/footer/Footer";

import { employeeRepo } from "./repositories/employeeRepo";
import type { Department } from "./types/department";

export default function App() {
    const [departmentList, setDepartmentList] = useState<Department[]>(
        employeeRepo.getDepartments
    );

    return (
        <>
            <Header />

            <Employees departments={departmentList} />

            <EmployeeForm
                departments={departmentList}
                onDepartmentsChange={setDepartmentList}
            />

            <Footer />
        </>
    );
}