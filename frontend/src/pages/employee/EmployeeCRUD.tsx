import { useEffect, useState } from "react";
import Employee from "../../types/Employee";
import employeesExample from "../../data/EmployeesExample";
import EmployeeTable from "../../components/organisms/EmployeeTable";
import BasicModal, {
  CloseOptions,
} from "../../components/atoms/modals/_BasicModal";
import EmployeeForm from "../../components/organisms/EmployeeForm";
import CircularButton from "../../components/atoms/buttons/CircularButton";

const API_URL = "http://localhost:3001/Employee";

function EmployeeCRUD() {
  const [employees, setEmployees] = useState<Employee[]>(employeesExample);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [openModal, setOpenModal] = useState<CloseOptions>({
    isOpen: false,
    onClose: () => {
      setOpenModal((prev) => ({ ...prev, isOpen: false }));
      setSelectedEmployee(null);
    },
    text: "Fechar",
  });

  useEffect(() => {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => setEmployees(data))
    .catch((err) => console.error("Erro ao buscar funcionarios:", err));
  }, []);

  const handleDeleteEmployee = async (employee: Employee | null) => {
    if (employee) {
      if (!window.confirm("Deseja realmente deletar este funcionário?")) return;

      let id = null;
      if (employee.codigo) {
        id = fetch(`${API_URL}?codigo=${employee.codigo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            return data[0].id;
          }
          throw new Error('Código não encontrado');
        })
      }

      fetch(`${API_URL}/${await id}`, {
        method: "DELETE",
      })
      .then(() => {
      setEmployees((prev) =>
        prev.filter((emp) => emp.codigo !== employee.codigo));
    }) 
    .catch((err) => console.error("Erro ao deletar funcionario:", err));
    }
  };

  const handleOpenModal = (employee?: Employee | null) => {
    if(employee) {
      setSelectedEmployee(employee);
    }

    setOpenModal((prev) => ({ ...prev, isOpen: true }));
  };

  const onConfirmEdit = async (employee: Employee) => {
    // Gambiarra para pegar o "id" do funcionario que foi editado. DEVE SER REMOVIDO POSTERIORMENTE  
    let id = null;
    if (employee.codigo) {
      id = fetch(`${API_URL}?codigo=${employee.codigo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          return data[0].id;
        }
        throw new Error('Código não encontrado');
      })
    } else {
      employee.codigo = Math.floor(Math.random() * 1000);
    }

    const method = employee.codigo ? "PUT" : "POST";
    const url = employee.codigo ? `${API_URL}/${await id}` : API_URL;
    
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
    .then((res) => res.json())
    .then((data) => {
      if (employee.codigo) {
        setEmployees((prev) =>
          prev.map((emp) => (emp.codigo === employee.codigo ? data : emp))
        );
      } else {
        setEmployees((prev) => [...prev, data]);
      }
      setSelectedEmployee(null);
    })
    .catch((err) => console.error("Erro ao atualizar ou criar funcionario:", err));
      setOpenModal((prev) => ({ ...prev, isOpen: false }));
      setSelectedEmployee(null);
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
    </div>
  );
}

export default EmployeeCRUD;
