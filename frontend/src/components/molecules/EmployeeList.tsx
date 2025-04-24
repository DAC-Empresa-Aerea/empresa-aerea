import EmployeeListItem from "../atoms/tableItens/EmployeeListItem";
import Employee from "../../types/Employee";

interface EmployeeListProps {
  title: string;
  employees: Employee[];
  editEmployee: (employee: Employee | null) => void;
  deleteEmployee: (employee: Employee | null) => void;
  buttonText: string;
  onViewMoreClick: () => void;
}

function EmployeeList({
  title,
  employees,
  buttonText,
  editEmployee,
  deleteEmployee,
  onViewMoreClick,
}: EmployeeListProps) {
  return (
    <section className="bg-white m-7 p-4 min-w-3/4 max-w-full h-full shadow-medium flex gap-4 flex-col rounded-2xl">
      <h2 className="font-roboto font-bold">{title}</h2>
      <ul className="flex flex-col gap-4">
        {employees.map((employee) => (
          <EmployeeListItem
            employee={employee}
            editEmployee={editEmployee}
            deleteEmployee={deleteEmployee}
          />
        ))}
      </ul>
      <button onClick={onViewMoreClick} className="btn-view-more">
        {buttonText}
      </button>
    </section>
  );
}

export default EmployeeList;
