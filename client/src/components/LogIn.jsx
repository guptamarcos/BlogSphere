// TAILWIND CSS STYLING CLASSES
const variants = {
  formStyling: "max-h-max w-[27.5%] bg-[#FFFFFF] border-2 border-[#E5E7EB] rounded-2xl px-[2rem] py-[2rem]",
  mainStyling: "h-screen w-screen flex bg-[#F3F4F6] justify-center items-center relative",
  headingStyling: "text-3xl mb-[2rem] text-[#111827] text-center font-medium",
  divStyling: "my-[1rem]",
  labelStyling: "text-lg text-[#374151] font-medium",
  inputStyling:"w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]",
  buttonStyling:"w-full bg-[#2563EB] text-lg text-[#FFFFFF] hover:[#1D4ED8] cursor-pointer py-[0.4rem] px-[1rem] rounded-xl hover:bg-[#1D4ED8]",
};

import { Link, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useFormik } from "formik";
import { logInSchema } from "../schemas/LogInSchema.jsx";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const initialValues = {
  username: "", password: "",
}

// SIGNUP FORM
function LogIn() {
  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);
 
  const {values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
    initialValues,
    validationSchema: logInSchema,
    onSubmit: async (values,action) => {
      try{
        let res = await axios.post("http://localhost:4000/api/auth/login",values,{withCredentials: true});
        await getUser();
        navigate("/blogsphere");
        action.resetForm();
      }catch(err){
        console.log(err);
      }
    }
  })

  return (
    <main className={`${variants.mainStyling}`}>
      <form className={`${variants.formStyling}`} onSubmit={handleSubmit}>
        <h2 className={`${variants.headingStyling}`}> LogIn into Account </h2>

        <div className={`${variants.divStyling}`}>
          <label htmlFor="username" className={`${variants.labelStyling}`}>
            Username
          </label>
          <br />
          <input
            placeholder="Enter your username"
            name="username"
            type="text"
            className={`${variants.inputStyling}`}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
            {errors.username && touched.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div className={`${variants.divStyling}`}>
          <label htmlFor="password" className={`${variants.labelStyling}`}>
            Password
          </label>
          <br />
          <input
            placeholder="Enter your password"
            name="password"
            type="password"
            className={`${variants.inputStyling}`}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
            {errors.password && touched.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button className={`${variants.buttonStyling}`}>LogIn</button>

        <p className="text-center text-lg mt-5">
           Didn't have account ? &nbsp;
           <Link to="/blogsphere/signup" className="text-blue-600 font-medium">
              Sign Up
           </Link>
        </p>
      </form>

      <Link to="/blogsphere" className="absolute top-10 left-12 text-gray-700 border border-gray-300 rounded-xl py-[0.4rem] px-[1rem] hover:text-gray-900 font-medium">
        <span className="flex items-center gap-1">
          <HiArrowLeft className="text-lg" />
          Back
        </span>
      </Link>

    </main>
  );
}

export default LogIn;
