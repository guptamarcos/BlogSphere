import { Navbar, Sidebar, Hero, Footer } from "./Index.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-[10vh] pl-[20vw] flex flex-col ">
        <Hero/>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
