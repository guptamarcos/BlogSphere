import * as Yup from "yup";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const profileSchema = Yup.object({
    bio: Yup.string()
    .max(500,"Bio must be at most 500 characters")
    .notRequired(),

    newPassword: Yup.string().when("oldPassword", {
        is: (val) => val && val.length > 0,
        then: (schema) => schema.required("New password is also required to update Old password"),
        otherwise: (schema) => schema.notRequired()
    }),

});

export { profileSchema }; 