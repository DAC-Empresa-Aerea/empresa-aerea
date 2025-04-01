import { useState } from "react";
import Employee from "../interfaces/Employee";
import employeesExample from "../data/EmployeesExample";
import EmployeeTable from "../components/organisms/EmployeeTable";
import BasicModal, { CloseOptions } from "../components/atoms/modals/_BasicModal";
import EmployeeForm from "../components/organisms/EmployeeForm";

function EmployeeCRUD() {
  const [employees, setEmployees] = useState<Employee[]>(employeesExample);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  const [openModal, setOpenModal] = useState<CloseOptions>({
    isOpen: false,
    onClose: () => setOpenModal(prev => ({ ...prev, isOpen: false })),
    text: "Fechar",
  });

  const handleOpenModal = (employee: Employee | null) => {
    if(employee) {
        setSelectedEmployee(employee);
    }
    setOpenModal(prev => ({ ...prev, isOpen: true }));
  };

  const onConfirm = () => {
    setOpenModal(prev => ({ ...prev, isOpen: false }));
    setSelectedEmployee(null);
  }

  return (
    <div>
      <EmployeeTable
        employees={employees}
        editEmployee={handleOpenModal}
        onViewMoreClick={() => alert("Ver mais funcionários não implementado")}
      />
      
      <BasicModal open={openModal}>
        <EmployeeForm setEmployees={setEmployees} employees={employees} employee={selectedEmployee} onConfirm={onConfirm}/>
      </BasicModal>
    </div>
  );
}

export default EmployeeCRUD;
