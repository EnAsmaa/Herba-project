import axios from "axios";
import toast from "react-hot-toast";

export const getWeightBmi = async (wValue, hValue) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASEURL}/IdealWeight/bmi`,
      {
        params: {
          weight: parseFloat(wValue),
          height: parseFloat(hValue)
        },
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

export const postWeightCalc = async (userdata) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASEURL}/IdealWeight/calculate`, userdata,
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
