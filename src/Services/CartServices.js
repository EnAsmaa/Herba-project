import axios from "axios";

export const sendGetCartData = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get("https://herbs.runasp.net/api/Cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const sendAddToCart = async (productId, quantity) => {
  try {
    const token = localStorage.getItem("loginToken");
    quantity = 1;
    const { data } = await axios.post(
      "https://herbs.runasp.net/api/Cart/add",
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
    console.log(data);

    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const sendRemoveFromCart = async (productId) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.delete(
      `https://herbs.runasp.net/api/Cart/remove/${productId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};
