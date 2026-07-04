import { useState } from "react";
import { equipmentService } from "../services/equipmentService";
import { getRequestErrorMessage } from "./getRequestErrorMessage";

interface DeleteEquipmentState {
  isLoading: boolean;
  errorMessage: string;
  delete: (equipmentId: string) => Promise<void>;
}

export function useDeleteEquipment(): DeleteEquipmentState {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function remove(equipmentId: string) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await equipmentService.deleteEquipment(equipmentId);
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    errorMessage,
    delete: remove,
  };
}
