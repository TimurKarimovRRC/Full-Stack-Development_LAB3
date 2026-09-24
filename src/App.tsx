import { useState } from "react";

import { Employees } from "./components/features/employees/Employees";
import { Header } from "./components/layout/header/Header";
import { Footer } from "./components/layout/footer/Footer";

import departments from "./data/departments";
import type { Department } from "./types/department";

export function App() {
    const [departmentList] = useState<Department[]>(departments);

    return (
        <>
            <Header />

            <Employees departments={departmentList} />

            <Footer />
        </>
    );
}