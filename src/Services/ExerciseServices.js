import axiosInstance from "./axiosInstance.js";
import toast from "react-hot-toast";

// get exercises
export const getAllExercise = async () => {
    try {
        const { data } = await axiosInstance.get("/Exercise");
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
    }
};

// get my exercise
export const getMyExercise = async () => {
    try {
        const { data } = await axiosInstance.get("/Exercise/my-exercises");
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
    }
};

// post an exercise
export const postExercise = async (exerciseId, userId) => {
    try {
        const { data } = await axiosInstance.post(
            "/Exercise/assign",
            {
                exerciseId,
                userId
            }
        );

        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
    }
};