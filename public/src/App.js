import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectOverview from "./pages/ProjectOverview";
import CreateProject from "./components/ProjectCreation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectGenerator from "./components/ProjectGenerator";

const App = () => {

    return (
        <Router>
            <div>
                <main>
                    <Routes>
                        <Route path="/" element={<ProjectOverview />} />
                        <Route path="/create" element={<CreateProject/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/generator" element={<ProjectGenerator/>} />
                    </Routes>
                </main>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
