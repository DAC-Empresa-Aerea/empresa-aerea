import Employee from "../../../interfaces/Employee";


interface EmployeeListItemProps {
    employee: Employee;
    editEmployee: (employee: Employee | null) => void;
    buttonText: string;
}

function EmployeeListItem({employee, editEmployee, buttonText}: EmployeeListItemProps) {
    return (
        <li className="border border-gray-light p-4 flex justify-between items-center rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
            <article className="font-roboto flex-1 flex flex-col gap-2">
                <h3 className="font-semibold text-lg">{employee.nome}</h3>
                <div className="flex items-center gap-2">
                    <span className="font-medium">{employee.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">{employee.email}</span>
                </div>
            </article>
            <div className="flex flex-col gap-2">
                <button
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition"
                    onClick={() => editEmployee(employee)}
                >
                    {buttonText}
                </button>
            </div>
        </li>
    );
}

export default EmployeeListItem;