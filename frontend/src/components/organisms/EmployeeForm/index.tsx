import { useState } from "react";
import Employee from "../../../types/Employee";
import EmployeeInputs from "../../molecules/employee/EmployeeInputs";
import SubmitButton from "../../atoms/buttons/SubmitButton";
import { UpdateEmployeeRequest } from "../../../types/api/employee";

interface EmployeeFormProps {
  employee?: Employee | null;
  onConfirm: (employee: Employee) => void;
}

function EmployeeForm({
  employee,
  onConfirm,
}: EmployeeFormProps) {
  const [employeeData, setEmployeeData] = useState<UpdateEmployeeRequest>(
    employee || ({} as UpdateEmployeeRequest)
  );

  const [isNew] = useState<boolean>(!employee?.codigo);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg justify-between">
      <EmployeeInputs
        employee={employeeData}
        setEmployee={setEmployeeData}
        isNew={isNew}
      />
      <SubmitButton
        text="Salvar"
        onClick={() => {
          if (employeeData.nome && employeeData.telefone && employeeData.email)
            onConfirm(employeeData);
          else alert("Preencha todos os campos!");
        }}
      />
    </div>
  );
}

export default EmployeeForm;
