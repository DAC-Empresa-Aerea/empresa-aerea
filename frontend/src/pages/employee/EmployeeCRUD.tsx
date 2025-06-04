import { useEffect, useState } from "react";
import EmployeeTable from "../../components/organisms/EmployeeTable";
import BasicModal, {
  CloseOptions,
} from "../../components/atoms/modals/_BasicModal";
import EmployeeForm from "../../components/organisms/EmployeeForm";
import CircularButton from "../../components/atoms/buttons/CircularButton";
import { useEmployees } from "../../hooks/employees/useEmployees";
import { useCreateEmployee } from "../../hooks/employees/useCreateEmployee";
import { useUpdateEmployee } from "../../hooks/employees/useUpdateEmployee";
import { useDeleteEmployee } from "../../hooks/employees/useDeleteEmployee";
import { EmployeeWithCode as Employee } from "../../types/api/employee";

function EmployeeCRUD() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState<Employee | null>(null);

  const [openModal, setOpenModal] = useState<CloseOptions>({
    isOpen: false,
    onClose: () => {
      setOpenModal((prev) => ({ ...prev, isOpen: false }));
      setSelectedEmployee(null);
    },
    text: "Fechar",
  });

  const { data: employeesData, refetch } = useEmployees();
  const createEmployeeMutation = useCreateEmployee();
  const updateEmployeeMutation = useUpdateEmployee();
  const deleteEmployeeMutation = useDeleteEmployee();

  useEffect(() => {
    if (employeesData) setEmployees(employeesData);
  }, [employeesData]);

  const handleDeleteEmployee = (employee?: Employee | null) => {
    if (employee) {
      setConfirmDelete(employee);
    }
  };

  const confirmDeleteEmployee = async () => {
    if (confirmDelete) {
      try {
        await deleteEmployeeMutation.mutateAsync(confirmDelete.codigo);
        setEmployees((prev) =>
          prev.filter((emp) => emp.codigo !== confirmDelete.codigo)
        );
        setConfirmDelete(null);
      } catch (err) {
        console.error("Erro ao deletar funcionário:", err);
      }
    }
  };

  const handleOpenModal = (employee?: Employee | null) => {
    if (employee) {
      setSelectedEmployee(employee);
    }
    setOpenModal((prev) => ({ ...prev, isOpen: true }));
  };

  const onConfirmEdit = async (employee: Employee) => {

    try {
      employee.telefone = employee.telefone.replace(/\D/g, "");
      employee.cpf = employee.cpf.replace(/\D/g, "");
      console.log("onConfirmEdit", employee);
      if (employee.codigo) {

        await updateEmployeeMutation.mutateAsync({
          codigo: employee.codigo,
          data: { ...employee },
        });
        setEmployees((prev) =>
          prev.map((emp) => (emp.codigo === employee.codigo ? employee : emp))
        );
      } else {
        // Para create, gerar senha aleatória
        const senha = employee?.senha
        const created = await createEmployeeMutation.mutateAsync({
          ...employee,
          senha,
        });
        setEmployees((prev) => [...prev, created]);
      }
      setSelectedEmployee(null);
      setOpenModal((prev) => ({ ...prev, isOpen: false }));
    } catch (err) {
      console.error("Erro ao atualizar/criar funcionário:", err);
    }
  };

  return (
    <div>
      <EmployeeTable
        employees={employees}
        editEmployee={handleOpenModal}
        deleteEmployee={handleDeleteEmployee}
      />

      <div className="fixed bottom-16 right-16">
        <CircularButton onClick={() => handleOpenModal()} />
      </div>

      <BasicModal open={openModal}>
        <EmployeeForm employee={selectedEmployee} onConfirm={onConfirmEdit} />
      </BasicModal>

      {confirmDelete && (
        <BasicModal
          open={{
            isOpen: true,
            onClose: () => setConfirmDelete(null),
            text: "Fechar",
          }}
        >
          <p>
            Tem certeza que deseja excluir o funcionário{" "}
            <strong>{confirmDelete.nome}</strong>?
          </p>
          <div className="flex justify-end mt-4 gap-2 w-full">
            <button
              onClick={confirmDeleteEmployee}
              className="bg-green-500 w-full p-4 rounded-lg text-gray-100 cursor-pointer shadow-md shadow-black/50"
            >
              Confirmar Deleção
            </button>
          </div>
        </BasicModal>
      )}
    </div>
  );
}

export default EmployeeCRUD;
