import axios from "axios";

export const getAllHerbas = async () => {
  try {
    const { data } = await axios.get("https://localhost:7190/api/Herb", {
      headers: {
        token: localStorage.getItem("loginToken"),
      },
    });
    return data.data;
  } catch (err) {
    console.log("error", err);
  }
};

export const getAllCategory = async () => {
  try {
    const { data } = await axios.get(
      "https://localhost:7190/api/Herb/categories",
      {
        headers: {
          token: localStorage.getItem("loginToken"),
        },
      },
    );
    return data.data;
  } catch (err) {
    console.log("error", err);
  }
};

export const getHerbId = async (herbId) => {
  try {
    const { data } = await axios.get(
      `https://localhost:7190/api/Herb/${herbId}`,
      {
        headers: {
          token: localStorage.getItem("loginToken"),
        },
      },
    );
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

// Favorit Herbas

export const getFavHerbas = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get("https://localhost:7190/api/Favorite", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("error", err);
  }
};


export const PostFavHerbas = async (herbId) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.post("https://localhost:7190/api/Favorite",{herbId}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

export const postDelHerb = async (herbId) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.delete(`https://localhost:7190/api/Favorite/${herbId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("error", err);
  }
};
