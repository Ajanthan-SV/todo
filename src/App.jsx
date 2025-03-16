import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import Homepage from "./views/Homepage";
import Registerpage from "./views/Registerpage";
import Loginpage from "./views/Loginpage";
import Navbar from "./views/Navbar";
import Todo from "./views/Todo";

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
    </Router>
  );
}

export default App;
