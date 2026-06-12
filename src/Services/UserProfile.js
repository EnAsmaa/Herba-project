import axios from "axios";
import toast from "react-hot-toast";

// get profile data
export const getProfileDataAPI = async () => {
  const token = localStorage.getItem("loginToken");
  try {
    if (token) {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASEURL}/User/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    }

  } catch (err) {
    return err.response?.data;
  }
};
// update data
export const updateUserData = async (formattedData) => {
  try {
    const token = localStorage.getItem("loginToken");

    const { data } = await axios.put(`${import.meta.env.VITE_BASEURL}/User/profile`, formattedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data;
  } catch (err) {
    toast.error(err?.message)
  }
}