import { useState } from "react";
import MilesPurchaseHeader from "../components/organisms/milesOrganisms/MilesPurchaseHeader";
import { Statement } from "../components/atoms/StatementListItem";
import StatementTable from "../components/organisms/StatementTable";

const ConsultStatement = () => {

    const [statement] = useState<Statement[]>([
        {
            transaction_date: new Date("2025-04-10T08:00:00"),
            reservation_code: "AB123",
            value_real: 100.0,
            miles_quantity: 1000,
            description: "Compra de Milhas",
            type: "Entrada",
        },
        {
            transaction_date: new Date("2025-05-15T12:00:00"),
            reservation_code: "CD456",
            value_real: 200.0,
            miles_quantity: 2000,
            description: "CWB->GRU",
            type: "Saída",
        },
        {
            transaction_date: new Date("2025-06-20T16:00:00"),
            reservation_code: "EF789",
            value_real: 150.0,
            miles_quantity: 1500,
            description: "Compra de Milhas",
            type: "Entrada",
        },
    ]);
    return(
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <MilesPurchaseHeader
          title="Confira seu Estrato de Milhas"
          subtitle="Confira seu extrato de milhas e fique por dentro de suas transações"
        />

        <StatementTable statements={statement} />
        </div>
    </div>
    );
};
export default ConsultStatement; 