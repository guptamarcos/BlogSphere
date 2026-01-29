import { useState, createContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try{
      const res = await axios.get("http://localhost:4000/api/auth/getUser", {withCredentials: true});
      setUser(res.data.user);
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
    <UserContext.Provider value={{ user,getUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
