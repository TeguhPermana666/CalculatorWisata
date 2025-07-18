import { apiDelete, apiGet, apiPost, apiPut } from "./api";
import Cookies from "js-cookie";


//

export const apiGetAllPackageFull = async () => {
  try {
    const response = await apiGet("/paket/full");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const apiPostPackageFull = async (data) => {
  const token = Cookies.get("token");
  try {
    const response = await apiPost("/paket/full", data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const apiPutPackageFull = async (id, data) => {
  const token = Cookies.get("token");
  try {
    const response = await apiPut(`/paket/full/${id}`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const apiDeletePackageFull = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await apiDelete(`/paket/full/${id}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// additional

export const apiGetAllActivityVendor = async () => {
  try {
    const response = await apiGet("/activity/vendors/full");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const apiGetActivityVendorById = async (id) => {
  try {
    const response = await apiGet(`/activity/vendors/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//

export const apiGetAllRestaurant = async () => {
  try {
    const response = await apiGet("/restaurant/full");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiGetRestaurantById = async (id) => {
  try {
    const response = await apiGet(`/restaurant/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//
export const apiGetAllDestination = async () => {
  try {
    const response = await apiGet("/tiket-masuk");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiGetDestinationById = async (id) => {
  try {
    const response = await apiGet(`/tiket-masuk/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
