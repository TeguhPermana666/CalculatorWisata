import { apiDelete, apiGet, apiPost, apiPut } from "./api";

export const apiGetAllRestaurant = async () => {
  try {
    const response = await apiGet("/restaurant/full");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiGetRestaurant = async (id) => {
  try {
    const response = await apiGet(`/restaurant/full/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const apiPostRestaurant = async (data) => {
  try {
    const response = await apiPost("/restaurant/full", data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const apiPutRestaurant = async (id, data) => {
  try {
    const response = await apiPut(`/restaurant/full/${id}`, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const apiDeleteRestaurant = async (id) => {
  try {
    const response = await apiDelete(`/restaurant/full/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
