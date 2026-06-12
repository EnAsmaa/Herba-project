import axios from "axios";
import toast from "react-hot-toast";

export const sendGetCartData = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/Cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    toast.error(error?.message);
  }
};

export const sendAddToCart = async (productId, quantity) => {
  try {
    const token = localStorage.getItem("loginToken");
    quantity = 1;
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASEURL}/Cart/add`,
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    toast.error(error?.message);
  }
};

export const sendRemoveFromCart = async (productId) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASEURL}/Cart/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    toast.error(error?.message);
  }
};
