import axiosInstance from "./axiosInstance.js";
import toast from "react-hot-toast";

// get all herbs
export const getAllHerbas = async () => {
  try {
    const { data } = await axiosInstance.get("/Herb");
    return data.data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

// get categories
export const getAllCategory = async () => {
  try {
    const { data } = await axiosInstance.get("/Herb/categories");
    return data.data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

// get herb by id
export const getHerbId = async (herbId) => {
  try {
    const { data } = await axiosInstance.get(`/Herb/${herbId}`);
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

// favorites
export const getFavHerbas = async () => {
  try {
    const { data } = await axiosInstance.get("/Favorite");
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

export const PostFavHerbas = async (herbId) => {
  try {
    const { data } = await axiosInstance.post("/Favorite", {
      herbId,
    });
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

export const DeleteFavHerb = async (herbId) => {
  try {
    const { data } = await axiosInstance.delete(`/Favorite/${herbId}`);
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};