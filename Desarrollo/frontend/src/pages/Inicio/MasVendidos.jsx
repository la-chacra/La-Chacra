import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import braserito from "../../assets/braserito.png";
import chivito from "../../assets/chivito.jpeg";
import napolitana from "../../assets/napolitana.jpeg";
import lomo from "../../assets/lomo-de-cerdo.jpg";

const platos = [
  { nombre: "Braserito", img: braserito, masVendido: true },
  { nombre: "Chivito La Chacra", img: chivito, masVendido: true },
  { nombre: "Napolitana", img: napolitana, masVendido: false },
  { nombre: "Lomo de Cerdo", img: lomo, masVendido: false },
  { nombre: "Braserito", img: braserito, masVendido: true },
  { nombre: "Chivito La Chacra", img: chivito, masVendido: true },
  { nombre: "Napolitana", img: napolitana, masVendido: false },
  { nombre: "Lomo de Cerdo", img: lomo, masVendido: false },
];

export default function MejoresPlatos() {
  const { t } = useTranslation();

  return (
    <section className="mv-section">
      <div className="mv-container">
        <div className="mv-card">
          <div className="mv-divider mv-divider-top"></div>
          <h2 className="mv-title font-overlock">{t("masVendidos.title")}</h2>

          <Swiper
            modules={[Navigation]}
            navigation
            loop
            centeredSlides
            slidesPerView={3}
            spaceBetween={30}
            className="mv-swiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {platos.map((plato, i) => (
              <SwiperSlide key={i}>
                <div className="mv-plate-card">
                  {plato.masVendido && (
                    <span className="mv-badge flex items-center gap-1 font-montserrat">
                      <FontAwesomeIcon icon={faFire} className="symbol" />
                      {t("masVendidos.best_seller")}
                    </span>
                  )}
                  <img src={plato.img} alt={plato.nombre} className="mv-img" />
                  <div className="mv-plate-title font-overlock">{plato.nombre}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mv-divider mv-divider-bottom"></div>
        </div>
      </div>
    </section>
  );
}
