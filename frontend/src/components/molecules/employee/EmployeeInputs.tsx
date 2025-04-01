import BasicInput from "../../atoms/inputs/BasicInput";
import Employee from "../../../interfaces/Employee";

interface EmployeeInputsProps {
    employee: Employee;
    setEmployee: (employee: Employee) => void;
}

function EmployeeInputs({employee, setEmployee}: EmployeeInputsProps) {
  return (
    <div>
        <BasicInput
            type="text"
            disabled={false}
            required={true}
            classNameAdd="w-full"
            placeholder="Digite o nome do funcionário"
            value={employee.nome}
            onChange={(e) => setEmployee({...employee, nome: e.target.value})}
            width="w-full"
        />

        <BasicInput
            type="text"
            disabled={false}
            required={true}
            classNameAdd="w-full"
            placeholder="Digite o telefone do funcionário"
            value={employee.telefone}
            onChange={(e) => setEmployee({...employee, telefone: e.target.value})}
            width="w-full"
        />  

        <BasicInput
            type="text"
            disabled={false}
            required={true}
            classNameAdd="w-full"
            placeholder="Digite o email do funcionário"
            value={employee.email}
            onChange={(e) => setEmployee({...employee, email: e.target.value})}
            width="w-full"
        />

    </div>

  );
}

export default EmployeeInputs;