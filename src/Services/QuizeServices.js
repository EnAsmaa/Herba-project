import axios from "axios";

export const getAllQuizes = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get("https://herbs.runasp.net/api/Quiz", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;


  } catch (err) {
    console.log(err);
  }
};
export const getMyQuizResults = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get("https://herbs.runasp.net/api/Quiz/my-results", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;


  } catch (err) {
    console.log(err);
  }
};

export const getQuizById = async (id) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get(`https://herbs.runasp.net/api/Quiz/${id}`, {
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
    const { data } = await axios.post(`https://herbs.runasp.net/api/Quiz/${id}/submit`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.error(`Error submitting quiz ${id}:`, err);
    throw err;
  }
};