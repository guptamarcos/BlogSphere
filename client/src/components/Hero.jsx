import { HomeCard,Loader } from "./Index.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

function Hero() {
  const [loader, setLoader] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);
  useEffect(() => {
    async function getAllBlogs() {
      try {
        let res = await axios.get("http://localhost:4000/api/blogs/getAllBlogs",{ withCredentials: true });
        setAllBlogs(res.data.data);
      } catch (err) {
        console.log(err);
      } finally{
        setLoader(false);
      }
    }
    getAllBlogs();
  }, []);
  return (
    <>
    {loader && <Loader/>}
    
    {!loader && (<main className="min-h-[90vh] border-b-2 p-10 border-b-[#E5E7EB] grid grid-cols-3 gap-8">
      {allBlogs.map((blog) => {
        return <HomeCard blogInfo={blog} key={blog._id} />
      })}
    </main>)}
    </>
  );
}

export default Hero;
