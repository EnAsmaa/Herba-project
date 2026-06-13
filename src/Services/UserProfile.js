import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

// get profile data
export const getProfileDataAPI = async () => {
  try {
    const { data } = await axiosInstance.get("/User/profile");
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

// update data
export const updateUserData = async (formattedData) => {
  try {
    const { data } = await axiosInstance.put(
      "/User/profile",
      formattedData
    );

    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};