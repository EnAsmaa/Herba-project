import axiosInstance from "./axiosInstance.js";
import toast from "react-hot-toast";

// send checkout
export const sendCheckout = async (cartId, location, paymentMethod) => {
  try {
    const { data } = await axiosInstance.post("/Order/checkout", {
      cartId,
      location,
      paymentMethod,
    });

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};

// get all orders
export const getAllOrders = async () => {
  try {
    const { data } = await axiosInstance.get("/Order");

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};