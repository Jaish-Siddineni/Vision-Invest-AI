import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div>
            <Navbar />
            <h1>Welcome to VisionInvest AI 📊</h1>
            <p>AI-powered investment insights & stock predictions.</p>
            <Footer />
        </div>
    );
};

export default Home;
