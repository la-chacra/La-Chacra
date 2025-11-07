import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import fotoMision from "../../assets/fotoMision.jpg";
import fotoSobre from "../../assets/fotoSobre.jpg";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import videoBg from "../../assets/videoBg.mp4";

export default function Mision() {
  const bgImages = [bg1, bg2, bg3];
  const [currentBg, setCurrentBg] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (activeIndex !== 0) return;
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeIndex === 1 && userInteracted) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [activeIndex, userInteracted]);

  return (
    <section className="nm-section">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".nm-next",
          prevEl: ".nm-prev",
        }}
        pagination={{ clickable: true }}
        loop={true}
        speed={800}
        grabCursor
        className="nm-swiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onTouchStart={() => setUserInteracted(true)}
        onNavigationNext={() => setUserInteracted(true)}
        onNavigationPrev={() => setUserInteracted(true)}
      >
        <SwiperSlide>
          <div className="nm-slide">
            <div className="nm-bg-wrapper">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentBg}
                  className="nm-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{
                    backgroundImage: `url(${bgImages[currentBg]})`,
                  }}
                />
              </AnimatePresence>
            </div>
            <div className="nm-overlay" />
            <div className="nm-card nm-left">
              <img src={fotoMision} alt="Misión" className="nm-card-img" />
              <div className="nm-card-text">
                <h2 className="nm-title font-overlock">Nuestra misión</h2>
                <p className="nm-paragraph font-montserrat">
                  Ofrecer a nuestros clientes una experiencia gastronómica única,
                  combinando ingredientes orgánicos y frescos con recetas cuidadas,
                  promoviendo un estilo de vida saludable y respetuoso con la
                  naturaleza, mientras brindamos un servicio cálido y cercano.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="nm-slide">
            {userInteracted ? (
              <video
                ref={videoRef}
                className="nm-bg-video"
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={videoBg} type="video/mp4" />
              </video>
            ) : (
              <div className="nm-bg placeholder-bg" />
            )}
            <div className="nm-overlay" />
            <div className="nm-card nm-right">
              <div className="nm-card-text">
                <h2 className="nm-title font-overlock">Sobre nosotros</h2>
                <p className="nm-paragraph font-montserrat">
                  Somos un restaurante que ofrece una experiencia gastronómica
                  casera y auténtica, inspirada en la naturaleza y el entorno rural.
                  Desde 2019, elaboramos pastas tradicionales, ensaladas frescas y
                  un asado especial, todo con dedicación y pasión. El lugar nació
                  como un sueño y busca compartir con sus clientes el amor por la
                  buena comida y la naturaleza.
                </p>
              </div>
              <img src={fotoSobre} alt="Sobre nosotros" className="nm-card-img" />
            </div>
          </div>
        </SwiperSlide>

        <div className="nm-nav nm-prev">
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className="nm-nav nm-next">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </Swiper>
    </section>
  );
}
