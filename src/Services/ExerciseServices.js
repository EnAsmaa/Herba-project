import axios from "axios";
// get exercises
export const getAllExercise = async () => {
    try {
        const { data } = await axios.get(
            "http://herbs.runasp.net/api/Exercise",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error.response.data);
    }
};
// get my exercise
export const getMyExercise = async () => {
    try {
        const { data } = await axios.get(
            "http://herbs.runasp.net/api/Exercise/my-exercises",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error.response.data);
    }
};
// post an exercise
export const postExercise = async (userData) => {
    try {
        const { data } = await axios.post(
            "http://herbs.runasp.net/api/Exercise/assign",userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error.response.data);
    }
};

