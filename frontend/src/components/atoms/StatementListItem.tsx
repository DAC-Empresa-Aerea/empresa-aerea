import { MilesTransaction } from "../../types/api/miles";

interface StatementListItemInfoProps {
    statement: MilesTransaction;
    onClick: () => void;
    buttonText: string;
}

function StatementListItem({ statement, onClick, buttonText }: StatementListItemInfoProps) {
    return (
        <li className="border border-gray-light p-4 flex justify-between items-center rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
            <article className="font-roboto flex-1 flex flex-col gap-2">
                <h3 className="font-semibold text-lg">{statement.codigo_reserva}</h3>
                <div className="flex items-center gap-2">
                    <span className="font-medium">{statement.tipo}</span>
                    <span className="text-sm text-gray-500">({new Date(statement.data).toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">R$ {statement.valor_reais}</span>
                    <span className="text-gray-500">|</span>
                    <span className="font-medium">Milhas: {statement.quantidade_milhas}</span>
                </div>
                <p className="text-sm font-medium text-gray-700"><span className="uppercase text-blue-600">{statement.descricao}</span></p>
            </article>
        </li>
    );
}

export default StatementListItem;