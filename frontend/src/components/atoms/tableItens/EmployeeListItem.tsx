import Employee from "../../../types/Employee";

interface EmployeeListItemProps {
  employee: Employee;
  editEmployee: (employee: Employee | null) => void;
  deleteEmployee: (employee: Employee | null) => void;
}

function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '').slice(0, 11); // remove não dígitos e limita a 11 chars
  return cleaned
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

function maskCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '').slice(0, 11);
  return cleaned
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}


function EmployeeListItem({
  employee,
  editEmployee,
  deleteEmployee,
}: EmployeeListItemProps) {
  return (
    <li className="border border-gray-light p-4 flex justify-between items-center rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
      <article className="font-roboto flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{employee.nome}</h3>
        <div className="flex items-center gap-2">
          <span className="font-medium">{employee.email}</span>
          <span className="text-gray-500">|</span>
          <span className="font-medium">{maskPhone(employee.telefone)}</span>
        </div>
        <div>
          <span className="font-medium">{maskCPF(employee.cpf)}</span>
        </div>
      </article>
      <div className="flex flex-col gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-900 transition"
          onClick={() => editEmployee(employee)}
        >
          Editar
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-950 transition"
          onClick={() => deleteEmployee(employee)}
        >
          Deletar
        </button>
      </div>
    </li>
  );
}

export default EmployeeListItem;
