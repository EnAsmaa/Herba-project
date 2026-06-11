import axios from "axios";

// send checkout
export const sendCheckout = async (cartId, location, paymentMethod) => {
    try {
        const { data } = await axios.post(
            "http://herbs.runasp.net/api/Order/checkout",
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
        console.log(error.response.data);
    }
};


// get all orders
export const getAllOrders = async () => {
    try {
        const { data } = await axios.get(
            "http://herbs.runasp.net/api/Order",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error.response.data);
    }
};