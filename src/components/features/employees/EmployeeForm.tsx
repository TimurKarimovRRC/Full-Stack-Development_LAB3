import { useState } from "react";
import type { FormEvent } from "react";

import type { Department } from "../../../types/department";
import type { Employee } from "../../../types/employee";

interface EmployeeFormProps {
    departments: Department[];
    onAddEmployee: (
        employee: Employee,
        departmentName: string
    ) => void;
}

export function EmployeeForm({
    departments,
    onAddEmployee,
}: EmployeeFormProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [validationMessages, setValidationMessages] =
        useState<string[]>([]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setValidationMessages([]);

        const messages: string[] = [];

        if (firstName.trim().length < 3) {
            messages.push(
                "First name must be at least three characters."
            );
        }

        const departmentExists = departments.some(
            (department) =>
                department.name === departmentName
        );

        if (!departmentExists) {
            messages.push(
                "Please select a department."
            );
        }

        if (messages.length > 0) {
            setValidationMessages(messages);
            return;
        }

        onAddEmployee(
            {
                firstName: firstName.trim(),
                lastName: lastName.trim() || undefined,
            },
            departmentName
        );

        setFirstName("");
        setLastName("");
        setDepartmentName("");
    }

    return (
        <section>
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">
                        First Name
                    </label>

                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(event) =>
                            setFirstName(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="lastName">
                        Last Name
                    </label>

                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(event) =>
                            setLastName(event.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="department">
                        Department
                    </label>

                    <select
                        id="department"
                        value={departmentName}
                        onChange={(event) =>
                            setDepartmentName(event.target.value)
                        }
                    >
                        <option value="">
                            Select a department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department.name}
                                value={department.name}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                {validationMessages.length > 0 && (
                    <ul>
                        {validationMessages.map((message) => (
                            <li key={message}>
                                {message}
                            </li>
                        ))}
                    </ul>
                )}

                <button type="submit">
                    Add Employee
                </button>
            </form>
        </section>
    );
}