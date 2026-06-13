import axiosInstance from "./axiosInstance.js";
import toast from "react-hot-toast";

// get doctors
export const getDoctorsAPI = async () => {
    try {
        const { data } = await axiosInstance.get("/User/doctors");
        return data;
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
    }
};

// get doctor data
export const getDoctorDataAPI = async (id) => {
    try {
        const { data } = await axiosInstance.get(`/User/doctor/${id}`);
        return data;
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
    }
};

// ask question
export const sendQuestionAPI = async (message, id) => {
    try {
        const { data } = await axiosInstance.post("/Consultation", {
            doctorId: id,
            message,
        });

        return data;
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
    }
};

// get my questions
export const getQuestionsAPI = async () => {
    try {
        const { data } = await axiosInstance.get(
            "/Consultation/my-consultations"
        );

        return data;
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
    }
};

// reply to consultation
export const sendReplyAPI = async (conId, replies) => {
    try {
        const { data } = await axiosInstance.post(
            "/Consultation/reply",
            {
                conId,
                reply: replies[conId],
            }
        );

        return data;
    } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
    }
};