import StatementListItem from "../atoms/StatementListItem";
import { MilesTransaction } from "../../types/api/miles";

interface StatementListProps {
    title: string;
    statements: MilesTransaction[];
    buttonText: string;
    onViewMoreClick: () => void;
}

function StatementList({
    title,
    statements,
    buttonText,
    onViewMoreClick,
}: StatementListProps) {
    return (
        <section className="bg-white m-7 p-4 min-w-3/4 max-w-full h-full shadow-medium flex gap-4 flex-col">
            <h2 className="font-roboto">{title}</h2>
            <ul className="flex flex-col gap-4">
                {statements.map((statement) => (
                    <StatementListItem 
                        key={statement.codigo_reserva} 
                        statement={statement}
                        buttonText={buttonText} onClick={() => {}} />
                ))}
            </ul>
        </section>
    );
}

export default StatementList;