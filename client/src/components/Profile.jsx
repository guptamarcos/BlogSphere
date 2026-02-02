import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useFormik } from "formik";
import { profileSchema } from "../schemas/ProfileSchema.jsx";
import axios from "axios";


function Profile() {
  const { user } = useContext(UserContext);

  const initialValues = {
    oldPassword: "", newPassword: "", bio: user.bio || "",
  }

  const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values,action) => {
      try{

        // IF BIO IS PRESENT THAN ONLY SEND THE REQUEST 
        if(values.bio.trim().length !== 0){
          await axios.patch("http://localhost:4000/api/auth/updateBio",{bio:values.bio},{withCredentials: true});
        }

        // IF PASSWORDS IS PRESENT THEN ONLY SEND THE REQUEST 
        if(values.oldPassword && values.newPassword){
          await axios.patch("http://localhost:4000/api/auth/updatePassword",{oldPassword: values.oldPassword, newPassword: values.newPassword},{withCredentials: true});
        }
        
        // RESET THE FORM
        action.resetForm();
      }catch(err){
        console.log(err);
      }
    }
  })
  
  return (
    <main className="h-max w-full py-[3rem] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="h-max w-[65%] bg-[#FFFFFF] border-2 border-[#E5E7EB] rounded-2xl px-[4rem] py-[2rem]">
        
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-8">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img src={"/default_user.svg"} alt="profileImage" className="h-[25vh] rounded-[50%] border-2 "></img>
          </label>
          <input id="profileImage" type="file" name="profileImage" className="hidden"></input>
        </div>

        {/* USER INFORMATION */}
        <div className="my-[1rem]">
          <label htmlFor="username" className="text-lg text-[#374151] font-medium">Username</label>
          <br />
          <input 
            type="text" 
            name="username"
            value={user.username}
            readOnly
            className="w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]">
          </input>
        </div>

        <div className="my-[1rem]">
          <label htmlFor="email" className="text-lg text-[#374151] font-medium">Email</label> <br />
          <input 
            type="email" 
            name="email"
            value={user.email}
            readOnly
            className="w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]">
          </input>
        </div>

        <div className="my-[1rem]">
          <label htmlFor="bio" className="text-lg text-[#374151] font-medium">Bio</label> <br />
          <textarea 
            placeholder="Tell us a little about yourself…" 
            name="bio"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full h-[20vh] resize-none text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.2rem] px-[0.6rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]">
          </textarea>
          {errors.bio && touched.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        <div className="my-[1rem]">
          <label htmlFor="oldPassword" className="text-lg text-[#374151] font-medium">Enter Old Password</label>
          <br />
          <input 
            type="password"
            name="oldPassword"
            value={values.oldPassword} 
            onChange={handleChange}
            className="w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]">  
          </input>
          
        </div>

        <div className="my-[1rem]">
          <label htmlFor="newPassword" className="text-lg text-[#374151] font-medium">Enter New Password</label>
          <br />
          <input 
            type="password" 
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]">    
          </input>
          {errors.newPassword && touched.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
        </div>

        <button className="w-full bg-[#2563EB] mt-[1rem] text-lg text-[#FFFFFF] hover:bg-[#1D4ED8] cursor-pointer py-[0.4rem] px-[1rem] rounded-xl hover:bg-[#1D4ED8]">Save Changes</button>
      </form>
    </main>
  );
}

export default Profile;

