import { useEffect, useState } from "react";
import MilesPurchaseHeader from "../../components/organisms/milesOrganisms/MilesPurchaseHeader";
import StatementTable from "../../components/organisms/StatementTable";
import { getMilesStatementByCustomerCode } from "../../services/milesService";
import { useAuth } from "../../contexts/loginContext";
import { MilesTransaction } from "../../types/Miles";

const ConsultStatement = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [statement, setStatement] = useState<MilesTransaction[]>([]);
  const [error, setError] = useState<string>("");

  const fetchMilesStatement = async () => {
    if (isAuthenticated && user && user.codigo) {
      try {
        const data = await getMilesStatementByCustomerCode(user.codigo);
        setStatement(data);
      } catch (err) {
        setError("Erro ao buscar extrato de milhas.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchMilesStatement();
    }
  }, [isAuthenticated, user, loading]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <MilesPurchaseHeader
          title="Confira seu Extrato de Milhas"
          subtitle="Confira seu extrato de milhas e fique por dentro de suas transações"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <StatementTable statements={statement} />
      </div>
    </div>
  );
};

export default ConsultStatement;
