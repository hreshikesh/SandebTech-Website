import { Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/solutions"
          element={<Solutions />}
        />

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
          path="/solutions/lotus-marine"
          element={<LotusMarine />}
        />


        
        <Route
          path="/contact"
          element={<Contact />}
        />
       

      </Route>

    </Routes>
  );
}

export default App;