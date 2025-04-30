import { MilesTransaction } from "../../../types/Miles";
import StatementList from "../../molecules/StatementList";

const statementDataExample: Array<MilesTransaction> = [
];

// Não deixe como opcional, apenas leve a constante acima para o componente pai
interface StatementTableProps {
statements: Array<MilesTransaction>;
}

function StatementTable({
  statements = statementDataExample,
}: StatementTableProps) {
return (
  <StatementList
    title=""  //fix o posicionamento 
    statements={statements}
    buttonText="Mais informações"
    onViewMoreClick={() => alert("Não implementado")}
  />
);
}

export default StatementTable;