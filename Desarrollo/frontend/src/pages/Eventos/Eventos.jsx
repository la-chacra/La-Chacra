import React from "react";
import { useTranslation } from 'react-i18next'
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaInfoCircle,
} from "react-icons/fa";
import aniversarioImg from "../../assets/Aniversario.jpeg";
import cumpleanosImg from "../../assets/cumpleanos.jpg";
import Header from "../../components/Header";
import LoggedInHeader from "../../components/LoggedInHeaderAdmin";
import { useAuth } from "../../hooks/useAuth";

export default function Eventos() {
  const { t } = useTranslation()

  const { autenticado } = useAuth();

  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      {/* HEADER */}
      {autenticado ? <LoggedInHeader /> : <Header />}

      {/* SECCIÓN EVENTOS */}
      <section className="text-white font-overlock py-12 sm:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Título */}
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl mb-10 font-texturina text-[#f1f1f1] tracking-wide">
            {t('eventos.title')}
          </h1>

          {/* Contenedor principal */}
          <div className="bg-[#F0E9F0] text-[#1a1a1a] rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg">
            {/* Descripción */}
            <p className="text-center text-base sm:text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
              {t('eventos.description')} 
            </p>

            {/* Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {/* Aniversarios */}
              <div className="flex flex-col items-center">
                <img
                  src={aniversarioImg}
                  alt="Aniversarios"
                  className="rounded-xl mb-4 w-full sm:w-5/6 lg:w-full h-56 sm:h-64 object-cover shadow-md"
                />
                <h3 className="text-lg sm:text-xl text-[#294a36] font-bold">
                  {t('eventos.anniversaries')}
                </h3>
              </div>

              {/* Cumpleaños */}
              <div className="flex flex-col items-center">
                <img
                  src={cumpleanosImg}
                  alt="Cumpleaños"
                  className="rounded-xl mb-4 w-full sm:w-5/6 lg:w-full h-56 sm:h-64 object-cover shadow-md"
                />
                <h3 className="text-lg sm:text-xl text-[#294a36] font-bold">
                  {t('eventos.birthdays')}
                </h3>
              </div>

              {/* Ocasiones especiales */}
              <div className="flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60"
                  alt="Ocasiones Especiales"
                  className="rounded-xl mb-4 w-full sm:w-5/6 lg:w-full h-56 sm:h-64 object-cover shadow-md"
                />
                <h3 className="text-lg sm:text-xl text-[#294a36] font-bold">
                  {t('eventos.special')}
                </h3>
              </div>
            </div>

            {/* Contacto */}
            <div className="text-center mt-12">
              <p className="text-base sm:text-lg mb-6">
                {t('eventos.contact')}
              </p>

              {/* Redes sociales */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8 text-lg sm:text-xl md:text-2xl">
                <a
                  href="https://facebook.com/lachacragourmet"
                  className="flex items-center gap-2 hover:text-[#3e5c45] transition-colors"
                >
                  <FaFacebook />
                  <span className="text-sm sm:text-base">
                    @lachacragourmet
                  </span>
                </a>
                <a
                  href="https://wa.me/099779388"
                  className="flex items-center gap-2 hover:text-[#3e5c45] transition-colors"
                >
                  <FaWhatsapp />
                  <span className="text-sm sm:text-base">099779388</span>
                </a>
                <a
                  href="https://instagram.com/lachacragourmet"
                  className="flex items-center gap-2 hover:text-[#3e5c45] transition-colors"
                >
                  <FaInstagram />
                  <span className="text-sm sm:text-base">
                    @lachacragourmet
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Aviso inferior con ícono */}
          <div className="bg-[#B96E00] mt-10 rounded-md text-center py-4 px-6 text-white font-montserrat text-sm sm:text-base font-medium flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-balance">
            <FaInfoCircle className="text-[#F2E3B3] text-lg sm:text-xl flex-shrink-0" />
            <span className="max-w-2xl">
              {t('eventos.bottom')}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
