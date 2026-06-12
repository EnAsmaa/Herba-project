import axios from "axios";

// send loginRequest
export const loginRequest = async (userData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASEURL}/Auth/login`,
      userData
    );
    return data.data;

  } catch (err) {
    return err.response?.data;
  }
};

// send registerRequest
export const registerRequest = async (userData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASEURL}/Auth/register`,
      userData,
    );
    return data.data;
  } catch (err) {
    return err.response?.data
  }
};

