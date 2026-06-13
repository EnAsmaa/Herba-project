import axiosInstance from "./axiosInstance.js";
import toast from "react-hot-toast";

export const getWeightBmi = async (wValue, hValue) => {
  try {
    const { data } = await axiosInstance.get("/IdealWeight/bmi", {
      params: {
        weight: parseFloat(wValue),
        height: parseFloat(hValue),
      },
    });

    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

export const postWeightCalc = async (userdata) => {
  try {
    const { data } = await axiosInstance.post(
      "/IdealWeight/calculate",
      userdata
    );

    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};