import axios from "axios";

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