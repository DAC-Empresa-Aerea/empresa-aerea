import StatementListItem, {Statement} from "../atoms/StatementListItem";

interface StatementListProps {
    title: string;
    statements: Statement[]; // Certifique-se de que Statement está importado ou definido
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
                        key={statement.reservation_code} 
                        statement={statement}
                        buttonText={buttonText} onClick={function (): void {
                            throw new Error("Function not implemented.");
                        } }                    />
                ))}
            </ul>
            <button onClick={onViewMoreClick} className="btn-view-more">
                View More
            </button>
        </section>
    );
}

export default StatementList;