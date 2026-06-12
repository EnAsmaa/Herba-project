import { createContext, useEffect, useState } from "react";
import { getAllHerbas } from "../Services/Herb";
import { getProfileDataAPI } from "../Services/UserProfile";

export const UserContext = createContext();

export default function UserContexProvider({ children }) {
  const [userProfileData, setUserProfileData] = useState();

  const getUserData = async () => {
    const response = await getProfileDataAPI();
    if (response && response.success) {
      setUserProfileData(response?.data);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userProfileData, setUserProfileData }}>
      {children}
    </UserContext.Provider>
  );
}
