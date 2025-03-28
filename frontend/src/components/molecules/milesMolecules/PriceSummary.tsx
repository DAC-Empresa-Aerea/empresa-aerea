import React from "react";
import LoadingButton from "../common/LoadingButton";

interface PriceSummaryProps {
  milesAmount: number;
  priceInReais: number;
  milesRatio: number;
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  formatCurrency: (value: number) => string;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  milesAmount,
  priceInReais,
  milesRatio,
  isProcessing,
  onSubmit,
  formatCurrency,
}) => {
  return (
    <div className="bg-gray-50 p-6 -mx-6 mt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">Valor total</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(priceInReais)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Proporção: {formatCurrency(milesRatio)} por milha
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-yellow-800">
                  Você economizará até{" "}
                  {formatCurrency(milesAmount * milesRatio * 0.5)} em voos!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoadingButton
        isLoading={isProcessing}
        onClick={onSubmit}
        loadingText="Processando..."
        text={`Comprar ${milesAmount.toLocaleString()} milhas`}
      />

      <p className="mt-4 text-xs text-center text-gray-500">
        Ao confirmar, você concorda com nossos{" "}
        <a href="#" className="text-blue-600 hover:underline">
          termos e condições
        </a>{" "}
        para compra e uso de milhas.
      </p>
    </div>
  );
};

export default PriceSummary;
