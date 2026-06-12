import axios from "axios";
import toast from "react-hot-toast";

export const getAllQuizes = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/Quiz`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;


  } catch (err) {
    toast.error(err?.message)
  }
};
export const getMyQuizResults = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/Quiz/my-results`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;


  } catch (err) {
    toast.error(err?.message)
  }
};

export const getQuizById = async (id) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/Quiz/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.error(`Error fetching quiz ${id}:`, err);
    throw err;
  }
};

// إرسال إجابات الكويز للحصول على النتيجة
export const submitQuizAnswers = async (id, payload) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.post(`${import.meta.env.VITE_BASEURL}/Quiz/${id}/submit`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (err) {
    console.error(`Error submitting quiz ${id}:`, err);
    throw err;
  }
};