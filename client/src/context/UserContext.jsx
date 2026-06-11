import { useState, createContext, useEffect } from "react";
import { GetUser } from "../api/userApi";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try{
      const res = await GetUser();
      setUser(res.user);
    }catch (err) {
      console.log(err);
      setUser(null);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
