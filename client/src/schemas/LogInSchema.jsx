import * as Yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const logInSchema = Yup.object({
    username: Yup.string()
    .min(3,"Username must contain at least 3 characters")
    .required("Username is required"),

    password: Yup.string()
    .matches(passwordRegex,"Password must be at least 5 characters and include uppercase, lowercase, number, and special character")
    .required("Password is required"),
});

export { logInSchema }; 