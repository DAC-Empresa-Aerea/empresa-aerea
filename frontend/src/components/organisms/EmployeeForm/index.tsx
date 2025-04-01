import { useState } from "react";
import Employee from "../../../interfaces/Employee";
import EmployeeInputs from "../../molecules/employee/EmployeeInputs";
import SubmitButton from "../../atoms/buttons/SubmitButton";

interface EmployeeFormProps {
    employee?: Employee | null;
    employees: Employee[];
    setEmployees: (employees: Employee[]) => void;
    onConfirm?: () => void;
}

function EmployeeForm({ employee = {} as Employee, employees, setEmployees, onConfirm}: EmployeeFormProps) {

    const [employeeData, setEmployeeData] = useState<Employee>(employee ?? {} as Employee);

    const handleSubmit = () => {
        if(employeeData.codigo){
            const updatedEmployees = employees.map(emp => emp.codigo === employeeData.codigo ? employeeData : emp);
            setEmployees(updatedEmployees);
        }
        else{
            setEmployees([...employees, {...employeeData, codigo: employees.length + 1}]);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md justify-between">
            <EmployeeInputs
                employee={employeeData}
                setEmployee={setEmployeeData}
            />
            <SubmitButton
                text="Salvar"
                onClick={() => {
                    handleSubmit();
                    onConfirm && onConfirm();
                }}    
            />
        </div>
    );
}

export default EmployeeForm;
