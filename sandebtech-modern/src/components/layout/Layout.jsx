import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";
import FloatingMeetingButton from "../meeting/FloatingMeetingButton";
import useAuth from "../../hooks/useAuth";
import ChatBot from "../../chatbot/components/Chatbot";

function Layout() {
  const {requireAuth}=useAuth();
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <Outlet />
      <ChatBot/>
      <FloatingMeetingButton/>
      <Footer />
    </>
  );
}

export default Layout;