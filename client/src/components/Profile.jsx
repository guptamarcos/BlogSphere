import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useFormik } from "formik";
import { profileSchema } from "../schemas/ProfileSchema.jsx";

const initialValues = {
    newPassword: "",
}
function Profile() {
  const { user } = useContext(UserContext);

  const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: async (values,action) => {
      try{
        action.resetForm();
      }catch(err){
        console.log(err);
      }
    }
  })
  
  return (
    <main className="h-[140vh] w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="h-max w-[65%] bg-[#FFFFFF] border-2 border-[#E5E7EB] rounded-2xl px-[4rem] py-[2rem]">
        
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img src="https://i.pravatar.cc/150" alt="profileImage" className="rounded-[50%]"></img>
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
            className="w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]">
          </input>
        </div>

        <div className="my-[1rem]">
          <label htmlFor="email" className="text-lg text-[#374151] font-medium">Email</label> <br />
          <input 
            type="email" 
            name="email"
            value={user.email}
            className="w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]">
          </input>
        </div>

        <div className="my-[1rem]">
          <label htmlFor="bio" className="text-lg text-[#374151] font-medium">Bio</label> <br />
          <textarea 
            placeholder="Bio" 
            name="Bio"
            className="w-full h-[20vh] resize-none text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]">
          </textarea>
        </div>

        <div className="my-[1rem]">
          <label htmlFor="oldPassword" className="text-lg text-[#374151] font-medium">Enter Old Password</label>
          <br />
          <input 
            type="password"
            name="oldPassword"
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

        <button className="w-full bg-[#2563EB] mt-[1rem] text-lg text-[#FFFFFF] hover:[#1D4ED8] cursor-pointer py-[0.4rem] px-[1rem] rounded-xl hover:bg-[#1D4ED8]">Save Changes</button>
      </form>
    </main>
  );
}

export default Profile;

