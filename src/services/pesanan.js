import { apiGet, apiPost } from "./api";
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export const apiPostPesanan = async (formData) => {
    try {
        const response = await apiPost('/pesanan', formData, token);
        return response;
    } catch (error) {
        console.error("Error creating pesanan:", error);
        throw error;
    }
};

export const apiGetPesanan = async() =>{
    try {
        const response = await apiGet('/pesanan', "", token);
        return response;
    } catch (error) {
        console.error("Error fetching pesanan:", error);
        throw error;
    }
}