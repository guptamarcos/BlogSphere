import * as Yup from "yup";

const newBlogSchema = Yup.object({
    category: Yup.string().trim().required("Blog Category name is required"),
    title: Yup.string().trim().required("Blog Title is required"),
    
    blogImage: Yup.file().trim().required("Blog Image is required"),
    slug : Yup.string().min(3, "Blog slug at least have 3 characters").trim().required("Slug is required"),

    blogContent: Yup.string().trim().min(10, "Blog content at least have 10 characters").max(500, "Blog content can't exceed 500 letters").trim().required("Blog Content is required"),
});


export { newBlogSchema };