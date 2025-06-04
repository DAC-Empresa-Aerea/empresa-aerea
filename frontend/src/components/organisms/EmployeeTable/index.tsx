import Employee from "../../../types/Employee";
import EmployeeList from "../../molecules/EmployeeList";

interface EmployeeTableProps {
  employees: Employee[];
  editEmployee: (employee: Employee | null) => void;
  deleteEmployee: (employee: Employee | null) => void;
}

function EmployeeTable({
  employees,
  editEmployee,
  deleteEmployee,
}: EmployeeTableProps) {
  return (
    <EmployeeList
      title="Gerenciar Funcionários"
      employees={employees}
      editEmployee={editEmployee}
      deleteEmployee={deleteEmployee}
    />
  );
}

export default EmployeeTable;
