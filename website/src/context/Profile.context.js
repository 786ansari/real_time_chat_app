import { createContext, useEffect, useState } from "react";
import { PostService } from "../services/post.service";
import { api_path } from "../services/api.routes";
export const profileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [dbId, setDbId] = useState(null);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      let data = {
        email: email,
      };
      getProfile(data);
    }
  },[]);

  const getProfile = async (data) => {
    const response = await PostService(api_path.profile, data);
    setIsAuthenticated(true);
    if (response?.status) {
      localStorage.setItem("email", response.data.email);
      setEmail(response.data.email);
      setName(response.data.name);
      setDbId(response.data._id);
      console.log("responseresponse", response);
    }
  };
  return (
    <>
      <profileContext.Provider
        value={{
          getProfile,
          isAuthenticated,
          name,
          email,
          dbId,
        }}
      >
        {children}
      </profileContext.Provider>
    </>
  );
};
