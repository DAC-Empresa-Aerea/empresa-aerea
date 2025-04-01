import { useState } from "react";
import Employee from "../../../interfaces/Employee";
import EmployeeInputs from "../../molecules/employee/EmployeeInputs";
import SubmitButton from "../../atoms/buttons/SubmitButton";

interface EmployeeFormProps {
    employee?: Employee | null;
    onConfirm: (employee: Employee) => void;
}

function EmployeeForm({ employee = {} as Employee, onConfirm}: EmployeeFormProps) {

    const [employeeData, setEmployeeData] = useState<Employee>(employee ?? {} as Employee);

    return (
        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md justify-between">
            <EmployeeInputs
                employee={employeeData}
                setEmployee={setEmployeeData}
            />
            <SubmitButton
                text="Salvar"
                onClick={() => {
                    if(employeeData.nome && employeeData.telefone && employeeData.email) onConfirm && onConfirm(employeeData);
                    else alert("Preencha todos os campos!");
                }}    
            />
        </div>
    );
}

export default EmployeeForm;
