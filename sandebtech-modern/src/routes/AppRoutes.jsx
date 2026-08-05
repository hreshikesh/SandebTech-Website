import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";

import Solutions from "../pages/Solution";

import ShipflowCFD from "../pages/ShipflowCFD";
import Caeses from "../pages/Caeses";
import Turbomachinery from "../pages/Turbomachinery";
import LotusMarine from "../pages/LotusMicro";

import Contact from "../pages/Contact";
import Meeting from "../pages/Meeting";
import Loader from "../components/Loader/Loader";
import NotFound from "../pages/NotFound";
import AuthManager from "../components/auth/AuthManager";

import AdminLayout from "../admin/layout/AdminLayout";
import Downloads from "../admin/pages/Download";
import Dashboard from "../admin/pages/Dashboard";
import Users from "../admin/pages/Users";
import Meetings from "../admin/pages/Meetings";
import Contacts from "../admin/pages/Contacts";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./AdminRoutes";
import SessionTimeout from "../components/auth/SessionTimeout";
import Application from "../pages/Application";
import TCAEPage from "../pages/TCAE/TCAEPage";
import Cae from "../pages/cae/Cae"
import NewsPage from "../pages/NewsPage/NewsPage";
import WebinarsPage from "../pages/WebnairPage/WebinarsPage";
import Hvac from "../pages/havc/Havc";
import Resources from "../pages/resources/Resources";
import Careers from "../pages/Carreer";
import TutorialsPage from "../pages/tutorial/TutorialsPage";
import TrainingPage from "../pages/training/TrainingPage";
import AeroSim from "../pages/aerosim/AeroSim";
import ColdStream from "../pages/coldstream/ColdStream";
function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 1800);

    return () => clearTimeout(timer);

  }, []);
  if (loading) {

    return <Loader />;

  }
  return (
    <>
      <Toaster position="bottom-right" />

      <SessionTimeout />

      <AuthManager />

      <AnimatePresence mode="wait">

        <Routes location={location} key={location.pathname}>

          <Route element={<Layout />}>

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />

            <Route path="/solutions" element={<Solutions />} />
            <Route path="/application" element={<Application />} />
            <Route
              path="/solutions/shipflow-cfd"
              element={<ShipflowCFD />}
            />

            <Route
              path="/solutions/caeses"
              element={<Caeses />}
            />

            <Route
              path="/solutions/turbomachinery"
              element={<Turbomachinery />}
            />

            <Route
              path="/solutions/lotus-micro"
              element={<LotusMarine />}
            />
            <Route
              path="/solutions/tcae"
              element={<TCAEPage></TCAEPage>}
            />
            <Route
              path="/solutions/aerosim"
              element={<AeroSim />}
            />
            <Route
              path="/solutions/cloud-cae"
              element={<Cae />} />
            <Route
              path="resources/news"
              element={<NewsPage />} />
            <Route
              path="resources/webinar"
              element={<WebinarsPage />} />
            <Route
              path="resources/tutorials"
              element={<TutorialsPage />} />
            <Route
              path="resources/training"
              element={<TrainingPage />} />



            <Route
              path="/resources"
              element={<Resources />} />

            <Route
              path="/career"
              element={<Careers />}
            />
            <Route
              path="/solutions/coldstream"
              element={<ColdStream />}
            />

            <Route path="/services/hvac" element={<Hvac />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/meeting" element={<Meeting />} />

            <Route path="*" element={<NotFound />} />

          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="downloads" element={<Downloads />} />
          </Route>

        </Routes>

      </AnimatePresence>

    </>
  );
}

export default App;