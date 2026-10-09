import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Employees } from "./components/features/employees/Employees";
import { EmployeeForm } from "./components/features/employees/EmployeeForm";
import { Organization } from "./components/features/organization/Organization";

import { Header } from "./components/layout/header/Header";
import { Nav } from "./components/layout/nav/Nav";
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
            <Nav />

            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/employees" replace />}
                />

                <Route
                    path="/employees"
                    element={
                        <>
                            <Employees departments={departmentList} />

                            <EmployeeForm
                                departments={departmentList}
                                onDepartmentsChange={setDepartmentList}
                            />
                        </>
                    }
                />

                <Route
                    path="/organization"
                    element={
                        <main>
                            <Organization />
                        </main>
                    }
                />
            </Routes>

            <Footer />
        </>
    );
}