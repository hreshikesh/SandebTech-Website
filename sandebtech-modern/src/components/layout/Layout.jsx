import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";

function Layout() {
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;