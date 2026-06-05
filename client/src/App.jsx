import { Hero,LogIn,Signup,Layout,AllCommentsTable, EditBlog,
Category,Profile, AllBlogsTable, AddNewBlog, BlogDetail} from "./components/Index.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";
import { ShowProfilePopupProvider } from "./context/ShowProfilePopupContext.jsx";

function App() {
  return (
    <>
      <UserContextProvider>
        <ShowProfilePopupProvider>

          <Routes>
            {/* REDIRECT TO THE "localhost:5173/blogsphere" INSTEAD OF "localhost:5173"  */}
            <Route path="/" element={<Navigate to="/blogsphere" replace />} />

            <Route path="/blogsphere" element={<Layout />}>
              <Route index element={<Hero />} />
              <Route path="user/blogs" element={<AllBlogsTable/>} />
              <Route path="user/:id/allBlogs/allComments" element={<AllCommentsTable />} />
              <Route path="blog/category/:categoryName" element={<Category />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="newBlog" element={<AddNewBlog/>} />
              <Route path="blog/:id" element={<BlogDetail/>} />
              <Route path="blog/edit/:id" element={<EditBlog/>} />
            </Route>
            
              <Route path="/blogsphere/signup" element={<Signup />} />
              <Route path="/blogsphere/logIn" element={<LogIn />} />
          </Routes>

        </ShowProfilePopupProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
