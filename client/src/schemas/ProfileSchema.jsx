import * as Yup from "yup";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const profileSchema = Yup.object({
    newPassword: Yup.string()
    .matches(passwordRegex,"New Password must be at least 5 characters and include uppercase, lowercase, number, and special character"),
});

export { profileSchema }; 