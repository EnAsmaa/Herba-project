import axios from "axios";


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
// update data
 export const updateUserData=async(formattedData)=>{
    try{
            const token = localStorage.getItem("loginToken");

      const {data}= await axios.put('http://herbs.runasp.net/api/User/profile',formattedData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //   console.log(data);
      return data;
    }catch(err)
    {
      console.log(err);
      
    }
  }