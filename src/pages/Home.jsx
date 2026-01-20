import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import IndustrySection from '../components/IndustrySection';
import ModelList from '../components/ModelList';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-page min-h-screen bg-bg-dark">
            <Header />
            <main>
                <Hero />
                <IndustrySection />
                <ModelList />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
