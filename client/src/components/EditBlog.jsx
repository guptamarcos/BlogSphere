const styles = {
  divStyling: "my-[1rem]",
  labelStyling: "text-lg text-[#374151] font-medium",
  inputStyling:"w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]",
  buttonStyling:"w-full bg-[#2563EB] text-lg text-[#FFFFFF] hover:bg-[#1D4ED8] cursor-pointer py-[0.4rem] px-[1rem] rounded-xl hover:bg-[#1D4ED8]",
};

import { TextEditor } from "./Index.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";

function EditBlog() {
  const { id } = useParams;

  // useEffect(()=>{
      
  // },[]);
  
  return (
    <main className="min-h-[70vh] w-full border-b py-[3rem] px-[4rem]  border-gray-200">
      <form className="border border-gray-200 p-[1.5rem] rounded-lg">
        <h1 className="text-3xl font-semibold">Edit Blog</h1>

        <div className={`${styles.divStyling}`}>
          <label htmlFor="Category" className={`${styles.labelStyling}`}>Category</label>
          <br />
          <input
            placeholder="Enter Your Category"
            name="Category" type="text"
            className={`${styles.inputStyling}`}
            ></input>
        </div>

        <div className={`${styles.divStyling}`}>
          <label htmlFor="Title" className={`${styles.labelStyling}`}>Title</label>
          <br />
          <input
            placeholder="Blog Title"
            name="Title" type="text"
            className={`${styles.inputStyling}`}
            ></input>
        </div>

        <div className={`${styles.divStyling}`}>
          <label htmlFor="slug" className={`${styles.labelStyling}`}>Slug</label>
          <br />
          <input
            placeholder="Blog slug"
            name="slug" type="text"
            className={`${styles.inputStyling}`}
            ></input>
        </div>
        
        <div className= "w-[17.5vw] my-[1.5rem]">
          <label htmlFor="blogImage" className="cursor-pointer">
            <img src={"/placeholderImage.png"} alt="blogImage" className="h-[25vh] border-2 border-dashed border-gray-400 "></img>
          </label>
          <input id="blogImage" type="file" name="blogImage" className="hidden"></input>
        </div>

        <div className={`${styles.divStyling}`}>
          <label htmlFor="blogContent" className={`${styles.labelStyling}`}>BlogContent</label>
          <TextEditor/>
        </div>


        <button className={`${styles.buttonStyling}`}>Add Blog</button>
      </form>
    </main>
  );
}

export default EditBlog;
