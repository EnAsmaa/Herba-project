import axios from "axios";
import toast from "react-hot-toast";
// get exercises
export const getAllExercise = async () => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASEURL}/Exercise`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );
        return data;
    } catch (error) {
        toast.error(error?.message);
    }
};
// get my exercise
export const getMyExercise = async () => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASEURL}/Exercise/my-exercises`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );
        return data;
    } catch (error) {
        toast.error(error?.message);
    }
};
// post an exercise
export const postExercise = async (userData) => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASEURL}/Exercise/my-exercises`, userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );
        return data;
    } catch (error) {
        toast.error(error?.message);
    }
};

