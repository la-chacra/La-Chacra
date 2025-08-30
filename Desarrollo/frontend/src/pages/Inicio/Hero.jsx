import React from 'react';
import heroImg from '../../assets/hero.jpg';

const Hero = () => {
    return (
    <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="flex flex-col items-center justify-center h-full text-white">
                <h1 className="text-4xl font-bold">La Chacra Gourmet</h1>
                <button className="bg-[#F2E3B3] mt-4 px-6 py-2 rounded">Ver Menú</button>
            </div>
        </section>
    );
};

export default Hero;