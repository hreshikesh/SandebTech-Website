import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";
import FloatingMeetingButton from "../meeting/FloatingMeetingButton";
import useAuth from "../../hooks/useAuth";

function Layout() {
  const {requireAuth}=useAuth();
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <Outlet />
      <FloatingMeetingButton/>
      <Footer />
    </>
  );
}

export default Layout;