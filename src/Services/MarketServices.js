import axios from "axios";
import toast from "react-hot-toast";

// get store data
export const getStoresAPI = async () => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASEURL}/Store`
        );
        return data
    } catch (error) {
        toast.error(error?.message)
    }
};

// get products
export const getProductsAPI = async () => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASEURL}/Store/products`
        );
        return data
    } catch (error) {
        toast.error(error?.message)
    }
};

// get market products
export const getMarketProductsAPI = async (storeId) => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASEURL}/Store/${storeId}/products`
        );
        return data
    } catch (error) {
        toast.error(error?.message)
    }
};