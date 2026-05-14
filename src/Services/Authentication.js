import axios from "axios";

// send loginRequest
export const loginRequest = async (userData) => {
  try {
    const { data } = await axios.post(
      "https://localhost:7190/api/Auth/login",
      userData
    );
    return data.data;
    
  } catch (err) {
    return err.response.data;
  }
};

// send registerRequest
export const registerRequest = async (userData) => {
  try {
    const { data } = await axios.post(
      "https://localhost:7190/api/Auth/register",
      userData,
    );
    return data.data;
  } catch (err) {
    return err.response.data
  }
};
