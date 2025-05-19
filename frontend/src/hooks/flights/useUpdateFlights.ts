import { useMutation } from "@tanstack/react-query";
import { updateFlightStatus } from "../../services/flights";
import { FlightStatus } from "../../types/api/flight";

/**
 * Custom hook that returns a mutation function to update the status of a flight.
 *
 * Uses React Query's `useMutation` to handle the mutation logic.
 *
 * @returns A mutation object for updating a flight's status.
 *
 * @example
 * const mutation = useUpdateFlightStatus();
 * mutation.mutate({ codigo: 'FL123', estado: FlightStatus.REALIZADO });
 *
 * @remarks
 * The mutation function expects an object containing:
 * - `codigo`: The unique identifier of the flight.
 * - `estado`: The new status of the flight, which can be either `FlightStatus.REALIZADO` or `FlightStatus.CANCELADO`.
 */
export const useUpdateFlightStatus = () =>
  useMutation({
    mutationFn: ({ codigo, estado }: { codigo: string, estado: FlightStatus.REALIZADO | FlightStatus.CANCELADO }) =>
      updateFlightStatus(codigo, { estado }),
  });