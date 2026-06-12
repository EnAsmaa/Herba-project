import axios from "axios";
import toast from "react-hot-toast";

export const getAllHerbas = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/Herb`, {
      headers: {
        token: localStorage.getItem("loginToken"),
      },
    });
    return data.data;
  } catch (err) {
    toast.error(err?.message)
  }
};

export const getAllCategory = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASEURL}/Herb/categories`,
      {
        headers: {
          token: localStorage.getItem("loginToken"),
        },
      },
    );
    return data.data;
  } catch (err) {
    toast.error(err?.message)
  }
};

export const getHerbId = async (herbId) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASEURL}/Herb/${herbId}`,
      {
        headers: {
          token: localStorage.getItem("loginToken"),
        },
      },
    );
    return data;
  } catch (err) {
    toast.error(err?.message)
  }
};

// Favorit Herbas

export const getFavHerbas = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/Favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    toast.error(err?.message)
  }
};

export const PostFavHerbas = async (herbId) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASEURL}/Favorite`,
      { herbId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err) {
    toast.error(err?.message)
  }
};

export const DeleteFavHerb = async (herbId) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASEURL}/Favorite/${herbId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err) {
    toast.error(err?.message)
  }
};
