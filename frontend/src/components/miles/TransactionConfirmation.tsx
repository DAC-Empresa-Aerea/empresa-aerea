import React from "react";
import { MilesTransaction, User } from "../../types/flightTypes";

interface TransactionConfirmationProps {
  transaction: MilesTransaction | null;
  user: User;
  formatCurrency: (value: number) => string;
  onNewPurchase: () => void;
}

const TransactionConfirmation: React.FC<TransactionConfirmationProps> = ({
  transaction,
  user,
  formatCurrency,
  onNewPurchase,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-green-50 px-6 py-8 border-b border-green-100">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-medium text-green-800">
              Compra realizada com sucesso!
            </h3>
            <p className="mt-2 text-sm text-green-700">
              Suas milhas foram adicionadas ao seu saldo.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Data da transação
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {transaction?.date.toLocaleString("pt-BR")}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Identificador</dt>
            <dd className="mt-1 text-sm text-gray-900">{transaction?.id}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Milhas adquiridas
            </dt>
            <dd className="mt-1 text-sm text-gray-900 font-medium">
              {transaction?.milesAmount.toLocaleString()} milhas
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Valor pago</dt>
            <dd className="mt-1 text-sm text-gray-900 font-medium">
              {formatCurrency(transaction?.amountInReais || 0)}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Descrição</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {transaction?.description}
            </dd>
          </div>
        </dl>

        <div className="mt-8 bg-blue-50 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-blue-700">
                Seu saldo atual de milhas:{" "}
                <span className="font-bold">
                  {user.milesBalance.toLocaleString()} milhas
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onNewPurchase}
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Comprar mais milhas
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionConfirmation;
