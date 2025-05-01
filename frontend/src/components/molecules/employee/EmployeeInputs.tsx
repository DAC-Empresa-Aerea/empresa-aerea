import BasicInput from "../../atoms/inputs/BasicInput";
import Employee from "../../../types/Employee";
import MaskedInput from "../../atoms/inputs/MaskedInput";

interface EmployeeInputsProps {
  employee: Employee;
  setEmployee: (employee: Employee) => void;
  isNew: boolean;
}

function EmployeeInputs({ employee, setEmployee, isNew }: EmployeeInputsProps) {
  return (
    <div>
      <BasicInput
        type="text"
        disabled={false}
        required={true}
        classNameAdd="w-full"
        placeholder="Digite o nome do funcionário"
        value={employee.nome || ""}
        onChange={(e) => setEmployee({ ...employee, nome: e.target.value })}
        width="w-full"
      />

      <MaskedInput
        mask="(00) 00000-0000"
        type="text"
        disabled={false}
        required={true}
        classNameAdd="w-full"
        placeholder="Digite o telefone do funcionário"
        value={employee.telefone || ""}
        onChange={(e) => setEmployee({ ...employee, telefone: e.target.value })}
        width="w-full"
      />

      <BasicInput
        type="email"
        disabled={false}
        required={true}
        classNameAdd="w-full"
        placeholder="Digite o email do funcionário"
        value={employee.email || ""}
        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        width="w-full"
      />

      <MaskedInput
        mask="000.000.000-00"
        type="text"
        disabled={!isNew}
        required={true}
        classNameAdd="w-full"
        placeholder="Digite o CPF do funcionário"
        value={employee.cpf || ""}
        onChange={(e) => setEmployee({ ...employee, cpf: e.target.value })}
        width="w-full"
      />
    </div>
  );
}

export default EmployeeInputs;
