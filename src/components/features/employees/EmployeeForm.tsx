import type { FormEvent } from "react";
import type { Department } from "../../../types/department";
import { useFormInput } from "../../../hooks/useFormInput";
import * as employeeService from "../../../services/employeeService";

interface EmployeeFormProps {
    departments: Department[];
    onDepartmentsChange: (departments: Department[]) => void;
}

export function EmployeeForm({
    departments,
    onDepartmentsChange,
}: EmployeeFormProps) {
    const firstName = useFormInput();
    const lastName = useFormInput();
    const departmentName = useFormInput();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const firstNameValidation = firstName.validate((value) =>
            employeeService.validateInput(value, "firstName")
        );

        const lastNameValidation = lastName.validate((value) =>
            employeeService.validateInput(value, "lastName")
        );

        const departmentValidation = departmentName.validate((value) =>
            employeeService.validateInput(value, "departmentName")
        );

        if (
            !firstNameValidation.isValid ||
            !lastNameValidation.isValid ||
            !departmentValidation.isValid
        ) {
            return;
        }

        const result = employeeService.createEmployee(
            {
                firstName: firstName.value,
                lastName: lastName.value,
            },
            departmentName.value
        );

        if (result.isValid) {
            onDepartmentsChange(result.departments);

            firstName.reset();
            lastName.reset();
            departmentName.reset();
        }
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
                        value={firstName.value}
                        onChange={(event) =>
                            firstName.setValue(event.target.value)
                        }
                        aria-invalid={firstName.messages.length > 0}
                        aria-describedby="firstName-messages"
                    />

                    <div id="firstName-messages" aria-live="polite">
                        {firstName.messages.map((message) => (
                            <p key={message}>{message}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="lastName">
                        Last Name
                    </label>

                    <input
                        id="lastName"
                        type="text"
                        value={lastName.value}
                        onChange={(event) =>
                            lastName.setValue(event.target.value)
                        }
                        aria-invalid={lastName.messages.length > 0}
                        aria-describedby="lastName-messages"
                    />

                    <div id="lastName-messages" aria-live="polite">
                        {lastName.messages.map((message) => (
                            <p key={message}>{message}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="department">
                        Department
                    </label>

                    <select
                        id="department"
                        value={departmentName.value}
                        onChange={(event) =>
                            departmentName.setValue(event.target.value)
                        }
                        aria-invalid={departmentName.messages.length > 0}
                        aria-describedby="department-messages"
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

                    <div id="department-messages" aria-live="polite">
                        {departmentName.messages.map((message) => (
                            <p key={message}>{message}</p>
                        ))}
                    </div>
                </div>

                <button type="submit">
                    Add Employee
                </button>
            </form>
        </section>
    );
}