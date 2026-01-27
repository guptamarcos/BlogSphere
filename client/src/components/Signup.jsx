// TAILWIND CSS STYLING CLASSES
const variants = {
  mainStyling: "h-screen w-screen flex bg-[#F3F4F6] justify-center items-center relative",
  formStyling: "max-h-max w-[30%] bg-[#FFFFFF] border-2 border-[#E5E7EB] rounded-2xl px-[2rem] py-[2rem]",
  headingStyling: "text-3xl mb-[2rem] text-[#111827] text-center font-medium",
  divStyling: "my-[1rem]",
  labelStyling: "text-lg text-[#374151] font-medium",
  inputStyling:"w-full text-base rounded-lg bg-[#F9FAFB] border border-[#D1D5DB] text-[#111827] py-[0.6rem] px-[1rem] mt-[0.4rem] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]",
  buttonStyling:"w-full bg-[#2563EB] text-lg text-[#FFFFFF] hover:[#1D4ED8] cursor-pointer py-[0.4rem] px-[1rem] rounded-xl hover:bg-[#1D4ED8]",
};

import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/SignupSchema";

const initialValues = {
  username: "", email: "", password: "", confirmPassword: "",
}

// SIGNUP FORM
function Signup() {
  const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values,action)=>{
      //console.log(values);
      action.resetForm();
    }
  })

  return (
    <main className={`${variants.mainStyling}`}>
      <form className={`${variants.formStyling}`} onSubmit={handleSubmit}>
        <h2 className={`${variants.headingStyling}`}>Create Account</h2>

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
          <label htmlFor="email" className={`${variants.labelStyling}`}>
            Email
          </label>{" "}
          <br />
          <input
            placeholder="Enter your email"
            name="email"
            type="email"
            className={`${variants.inputStyling}`}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${variants.inputStyling}`}
          ></input>
          {errors.password && touched.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        

        <div className={`${variants.divStyling}`}>
          <label htmlFor="confirmPassword" className={`${variants.labelStyling}`}>
            ConfirmPassword
          </label>
          <br />
          <input
            placeholder="Enter your confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${variants.inputStyling}`}
          ></input>
          {errors.confirmPassword && touched.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <button className={`${variants.buttonStyling}`}>Register</button>

        <p className="text-center text-lg mt-5">
            Already have account ?  &nbsp;
            <Link to="/blogsphere/logIn" className="text-blue-600 font-medium">
              LogIn
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

export default Signup;
