import { CommentTableRow } from "./Index.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { UserBlogComments } from "../api/blogApi.jsx";
// import axios from "axios";

function AllCommentsTable() {
  const { id } = useParams();
  const [userBlogsComments,setUserBlogsComments] = useState([]);

  async function getUserBlogsComments(){
    try{
      let res = await UserBlogComments();
      setUserBlogsComments(res?.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getUserBlogsComments();
  },[]);
  
  return (
    <main className="min-h-[70vh] w-full border-b py-[3rem] px-[3rem] border-gray-200">
      <div className="border border-gray-200 p-[1.5rem] rounded-lg">
        <div className="border border-gray-200 rounded-md">
          
          {/* HEADER PART */}
          <header className="grid grid-cols-8 gap-2 border-b border-gray-200 bg-gray-100 text-lg text-gray-500 font-semibold">
            <div className="p-4 col-start-1 col-end-4">Blog</div>
            <div className="p-4 col-start-4 col-end-5">Comment By</div>
            <div className="p-4 col-start-5 col-end-6">Date</div>
            <div className="p-4 col-start-6 col-end-8">Comment</div>
            <div className="p-4 col-start-8 col-end-9">Action</div>
          </header>

          {/* COMMENTS ROW */}
          {userBlogsComments?.map((commentValue)=>{
            return <CommentTableRow  commentValue={commentValue} key={commentValue._id} getUserBlogsComments={getUserBlogsComments}/>
          })}
          

        </div>
      </div>
    </main>
  );
}

export default AllCommentsTable;
