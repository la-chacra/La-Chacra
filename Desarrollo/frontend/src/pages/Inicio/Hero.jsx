import React from "react";
import heroImg from "../../assets/hero.jpeg";
import logo from "../../assets/logo.png"; 
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <>
      <section
        className="hero-section h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/65 fade-in"></div>

<nav className="absolute top-0 left-0 w-full flex flex-col sm:flex-row items-center px-4 sm:px-10 py-4 z-20">
    <img 
        src={logo} 
        alt="La Chacra Logo" 
        className="h-10 sm:h-16 md:h-20 lg:h-[100px] w-auto fade-in mb-2 sm:mb-0" 
    />

        <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 text-white font-semibold font-overlock whitespace-nowrap text-base sm:text-lg">
            <a href="/carta" className="hover:text-[#F2E3B3] underline-center transition-colors fade-in" style={{ fontSize: 'clamp(14px, 2vw, 25px)' }}>Carta</a>
            <span className="text-[#F2E3B3] fade-in">•</span>
            <a href="/sobre-nosotros" className="hover:text-[#F2E3B3] underline-center transition-colors fade-in" style={{ fontSize: 'clamp(14px, 2vw, 25px)' }}>Sobre Nosotros</a>
            <span className="text-[#F2E3B3] fade-in">•</span>
            <a href="/reserva" className="hover:text-[#F2E3B3] underline-center transition-colors fade-in" style={{ fontSize: 'clamp(14px, 2vw, 25px)' }}>Reserva</a>
            <span className="text-[#F2E3B3] fade-in">•</span>
            <a href="/eventos" className="hover:text-[#F2E3B3] underline-center transition-colors fade-in" style={{ fontSize: 'clamp(14px, 2vw, 25px)' }}>Eventos</a>
        </div>
        </nav>



        <div className="flex flex-col items-center justify-center h-full relative z-10 text-center">
          <h1 className="text-7xl font-bold font-texturina text-[#F2E3B3] tracking-wider fade-in-up text-shadow text-hero-title">
            La Chacra Gourmet
          </h1>

          <Link to="/carta" className="menu-btn font-montserrat fade-in-up mt-6 flex items-center justify-center">
            Ver menú <FontAwesomeIcon icon={faUtensils} className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
