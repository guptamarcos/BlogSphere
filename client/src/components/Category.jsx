import { useParams } from "react-router-dom";
import { MdGridView } from "react-icons/md";
import { HomeCard } from "./Index.jsx";
import { useEffect, useState } from "react";
import { GetBlogsByCategory } from "../api/blogApi.jsx";

function Category() {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState();

  async function getBlogsByCategory() {
    try {
      let res = await GetBlogsByCategory(categoryName);
      setBlogs(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBlogsByCategory();
  }, [categoryName]);

  return (
    <main className="min-h-[90vh] py-[2rem] px-[4rem] ">
      <h1 className="text-3xl font-semibold capitalize text-violet-600 flex gap-2 items-center">
        <MdGridView />
        {categoryName}
      </h1>
      <hr className="text-gray-300 my-4" />
      <div className="grid grid-cols-3 gap-8">
        {blogs?.map((value)=>{
            return <HomeCard blogInfo={value} key={value._id} />
        })}
    </div>
    </main>
  );
}

export default Category;
