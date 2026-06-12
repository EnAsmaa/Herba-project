import axios from "axios";

export const getAllHerbas = async () => {
  try {
    const { data } = await axios.get("http://herbs.runasp.net/api/Herb", {
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
      "http://herbs.runasp.net/api/Herb/categories",
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
      `http://herb.runasp.net/api/Herb/${herbId}`,
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
    const { data } = await axios.get("http://herbs.runasp.net/api/Favorite", {
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
    const { data } = await axios.post("http://herbs.runasp.net/api/Favorite", { herbId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

export const DeleteFavHerb = async (herbId) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.delete(`http://herbs.runasp.net/api/Favorite/${herbId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("error", err);
  }
};
