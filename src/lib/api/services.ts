import { serverFetch } from "../core/server"

export interface GetServicesParams {
  search?: string;
  category?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  sort?: string;
  page?: string | number;
  limit?: string | number;
}

export const getAllServices = async (params?: GetServicesParams) => {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.category && params.category !== "All") query.set("category", params.category);
  if (params?.minPrice) query.set("minPrice", String(params.minPrice));
  if (params?.maxPrice) query.set("maxPrice", String(params.maxPrice));
  if (params?.sort) query.set("sort", params.sort);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const queryString = query.toString();
  const path = queryString ? `/services?${queryString}` : `/services`;
  return serverFetch(path);
}

export const getServiceById = async(id: string)=>{
  return serverFetch(`/services/${id}`);
}