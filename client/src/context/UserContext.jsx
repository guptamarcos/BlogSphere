import { useState, createContext, useEffect ,useContext} from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/getUser",{withCredentials: true});
        setUser(res.data.user);
      }catch(err){
        console.log(err);
        setUser(null);
      }finally{
        setLoading(false);
      }
    }
    
    getUser();
  }, []);

  return (
      <UserContext.Provider  value={{user,setUser}}>
        {!loading && children}
      </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
