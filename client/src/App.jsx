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
              <Route path="user/allblogs" element={<AllBlogsTable/>} />
              <Route path="allcomments" element={<AllCommentsTable />} />
              <Route path="category/:categoryName" element={<Category />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="newBlog" element={<AddNewBlog/>} />
              <Route path="blogDetail" element={<BlogDetail/>} />
              <Route path="editBlog" element={<EditBlog/>} />
              <Route path="signup" element={<Signup />} />
              <Route path="logIn" element={<LogIn />} />
            </Route>
            
          </Routes>

        </ShowProfilePopupProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
