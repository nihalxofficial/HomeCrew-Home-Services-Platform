import { Service } from "@/types"
import { serverMutation } from "../core/server"

export const addService = async(data: Partial<Service>)=>{
    return serverMutation(`/services`, data)
}


export interface GenerateListingResult {
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  priceUnit: "fixed" | "hourly";
  duration: string;
  tags: string[];
  whatsIncluded?: string[];
  availableCities?: string[];
}

export const generateServiceListing = async (idea: string) => {
  return serverMutation(`/services/generate`, { idea });
};