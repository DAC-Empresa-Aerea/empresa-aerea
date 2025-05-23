import { useMutation } from "@tanstack/react-query";
import { createFlight } from "../../services/flights";
import { CreateFlightRequest, FlightWithAirportCodes } from "../../types/api/flight";
import { queryClient } from "../../App";

/**
 * Hook React customizado para criar um novo voo usando uma mutação.
 *
 * Este hook utiliza o `useMutation` do React Query para lidar com a criação de um voo.
 * Ao criar com sucesso, ele invalida a query "flights" para garantir que a lista de voos seja atualizada.
 *
 * @returns {UseMutationResult<FlightWithAirportCodes, Error, CreateFlightRequest>} 
 *   O objeto de mutação para criar um voo.
 *
 * @example
 * const createFlightMutation = useCreateFlight();
 * createFlightMutation.mutate({ ...flightData });
 */
export const useCreateFlight = () =>
    useMutation<FlightWithAirportCodes, Error, CreateFlightRequest>({
        mutationFn: (data: CreateFlightRequest) => createFlight(data).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["flights"] });
        }
    });