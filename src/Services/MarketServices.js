import axiosInstance from "./axiosInstance.js";
import toast from "react-hot-toast";

// get store data
export const getStoresAPI = async () => {
    try {
        const { data } = await axiosInstance.get("/Store");
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
    }
};

// get products
export const getProductsAPI = async () => {
    try {
        const { data } = await axiosInstance.get("/Store/products");
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
    }
};

// get market products
export const getMarketProductsAPI = async (storeId) => {
    try {
        const { data } = await axiosInstance.get(`/Store/${storeId}/products`);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
    }
};