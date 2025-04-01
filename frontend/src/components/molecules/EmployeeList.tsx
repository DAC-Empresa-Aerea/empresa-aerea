import EmployeeListItem from "../atoms/tableItens/EmployeeListItem";
import Employee from "../../interfaces/Employee";

interface EmployeeListProps {
    title: string;
    employees: Employee[]; 
    buttonText: string;
    onViewMoreClick: () => void;
}

function EmployeeList({
    title,
    employees,
    buttonText,
    onViewMoreClick,
}: EmployeeListProps) {
    return (
        <section className="bg-white m-7 p-4 min-w-3/4 max-w-full h-full shadow-medium flex gap-4 flex-col">
            <h2 className="font-roboto">{title}</h2>
            <ul className="flex flex-col gap-4">
                {employees.map((employee) => (
                    <EmployeeListItem 
                        employee={employee}
                        buttonText={buttonText || "Editar"} 
                        editEmployee={() => {}} 
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