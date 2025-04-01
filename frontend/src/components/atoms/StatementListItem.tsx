export interface Statement {
    transaction_date: Date;
    reservation_code: string;
    value_real: number;
    miles_quantity: number;
    description: string;
    type: string;
}

interface StatementListItemInfoProps {
    statement: Statement;
    onClick: () => void;
    buttonText: string;
}

function StatementListItem({ statement, onClick, buttonText }: StatementListItemInfoProps) {
    return (
        <li className="border border-gray-light p-4 flex justify-between items-center rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
            <article className="font-roboto flex-1 flex flex-col gap-2">
                <h3 className="font-semibold text-lg">{statement.reservation_code}</h3>
                <div className="flex items-center gap-2">
                    <span className="font-medium">{statement.type}</span>
                    <span className="text-sm text-gray-500">({new Date(statement.transaction_date).toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">R$ {statement.value_real}</span>
                    <span className="text-gray-500">|</span>
                    <span className="font-medium">Milhas: {statement.miles_quantity}</span>
                </div>
                <p className="text-sm font-medium text-gray-700"><span className="uppercase text-blue-600">{statement.description}</span></p>
            </article>
            <button
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition"
                onClick={onClick}
            >
                {buttonText}
            </button>
        </li>
    );
}

export default StatementListItem;