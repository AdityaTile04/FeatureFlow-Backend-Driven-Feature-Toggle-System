import axios from "axios";
import type { FeatureFlag } from "../types/FeatureFlag";

export const API_BASE_URL = "http://backend:8080/api/v1/flags";

export const getAllFlags = async (): Promise<FeatureFlag[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const toggleFlag = async (id: number): Promise<FeatureFlag[]> => {
  const response = await axios.put(`${API_BASE_URL}/${id}/toggle`);
  return response.data;
};
