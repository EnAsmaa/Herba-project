import axios from "axios";

// send loginRequest
export const loginRequest = async (userData) => {
  try {
    const { data } = await axios.post(
      "http://herbs.runasp.net/api/Auth/login",
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
      "http://herbs.runasp.net/api/Auth/register",
      userData,
    );
    return data.data;
  } catch (err) {
    return err.response.data
  }
};


// get profile data
export const getProfileDataAPI = async () => {
  const token = localStorage.getItem("loginToken");
  try {
    const { data } = await axios.get(
      "http://herbs.runasp.net/api/User/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;

  } catch (err) {
    return err.response.data;
  }
};
