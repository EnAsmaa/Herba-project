import axios from "axios";
import toast from "react-hot-toast";

// send checkout
export const sendCheckout = async (cartId, location, paymentMethod) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_BASEURL}/Order/checkout`,
            {
                cartId,
                location,
                paymentMethod
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );

        return data;
    } catch (error) {
        toast.error(error?.message)
    }
};


// get all orders
export const getAllOrders = async () => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASEURL}/Order`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );
        return data;
    } catch (error) {
        toast.error(error?.message)
    }
};