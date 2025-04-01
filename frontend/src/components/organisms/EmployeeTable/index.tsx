import Employee from "../../../interfaces/Employee";
import employeesExample from "../../../data/EmployeesExample";
import EmployeeList from "../../molecules/EmployeeList";

interface EmployeeTableProps {
    employees: Employee[];
    editEmployee: (employee: Employee | null) => void;
    onViewMoreClick: () => void;
}

function EmployeeTable({
    employees = employeesExample,
    editEmployee,
    onViewMoreClick,
}: EmployeeTableProps) {
    return (
        <EmployeeList
            title="Funcionários"
            employees={employees}
            editEmployee={editEmployee}
            buttonText="Editar"
            onViewMoreClick={onViewMoreClick}
        />
    );
}

export default EmployeeTable;