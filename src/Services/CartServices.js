import axiosInstance from "./axiosInstance.js";
import toast from "react-hot-toast";

// get cart data
export const sendGetCartData = async () => {
  try {
    const { data } = await axiosInstance.get("/Cart");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};

// add to cart
export const sendAddToCart = async (productId, quantity = 1) => {
  try {
    const { data } = await axiosInstance.post("/Cart/add", {
      productId,
      quantity,
    });

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};

// remove from cart
export const sendRemoveFromCart = async (productId) => {
  try {
    const { data } = await axiosInstance.delete(
      `/Cart/remove/${productId}`
    );

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};