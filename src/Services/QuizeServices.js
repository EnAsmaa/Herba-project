import axiosInstance from "./axiosInstance.js";
import toast from "react-hot-toast";

export const getAllQuizes = async () => {
  try {
    const { data } = await axiosInstance.get("/Quiz");
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

export const getMyQuizResults = async () => {
  try {
    const { data } = await axiosInstance.get("/Quiz/my-results");
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  }
};

export const getQuizById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/Quiz/${id}`);
    return data;
  } catch (err) {
    console.error(`Error fetching quiz ${id}:`, err);
    throw err;
  }
};

// إرسال إجابات الكويز للحصول على النتيجة
export const submitQuizAnswers = async (id, payload) => {
  try {
    const { data } = await axiosInstance.post(
      `/Quiz/${id}/submit`,
      payload
    );

    return data;
  } catch (err) {
    console.error(`Error submitting quiz ${id}:`, err);
    throw err;
  }
};