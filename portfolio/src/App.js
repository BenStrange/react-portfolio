import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Footer from "./components/Footer";
// import Resume from "./components/Resume/ResumeNew";
import Portfolio from "./components/Portfolio/Portfolio";
import Credits from "./components/Credits/Credits";
import Blogs from "./components/Blogs/Blogs";
import AdminPage from "./components/Admin/Admin";
import Contact from "./components/Contact/Contact";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/resume" element={<Resume />} /> */}
          <Route path="*" element={<Navigate to="/"/>} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;