import axios from "axios";

export const getWeightHistory = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.get(
      "http://herbs.runasp.net/api/IdealWeight/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
// export const getWeightBmi = async () => {
//   try {
//     const token = localStorage.getItem("loginToken");
//     const { data } = await axios.get(
//       "http://herbs.runasp.net/api/IdealWeight/history",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const postWeightCalc= async (userdata) => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios.post(
      "http://herbs.runasp.net/api/IdealWeight/calculate",userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
