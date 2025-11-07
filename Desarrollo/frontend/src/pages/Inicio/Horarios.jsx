import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarkerAlt,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';



export default function Horarios() {
  return (
    <section className="rh-section">
      <div className="rh-sidebar rh-sidebar-left"></div>
      <div className="rh-sidebar rh-sidebar-right"></div>


      <div className="rh-container">
        <div className="rh-card">
          <h2 className="rh-title font-overlock">
            <FontAwesomeIcon icon={faClock} className="rh-icon1" />
            Horarios
          </h2>
          <ul className="rh-list">
            <li>
              <p className="rh-day font-montserrat">Viernes y Sábados</p>
              <p className="rh-time font-montserrat">11:30 a.m - 2:30 p.m</p>
              <p className="rh-time font-montserrat">8:30 p.m - 12 a.m</p>
            </li>
            <li>
              <p className="rh-day font-montserrat">Domingos</p>
              <p className="rh-time font-montserrat">11:30 a.m - 2:30 p.m</p>
            </li>
          </ul>
          <Link to="/reserva" className="inline-block">
            <button className="rh-button font-montserrat">
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
              Hacé tu reserva
            </button>
          </Link>
        </div>

        <div className="rh-card rh-map-card">
          <h2 className="rh-title font-overlock">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="rh-icon" />
            ¿Dónde estamos?
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.546731919751!2d-57.59506732521384!3d-30.278493474806517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95acd7fae122a4d3%3A0xaea5a6f448772d48!2sLa%20Chacra!5e0!3m2!1ses!2suy!4v1757120390819!5m2!1ses!2suy"
            className="rh-map"
            allowFullScreen=""
            loading="lazy"
            title="Mapa de ubicación"
          ></iframe>
        </div>
      </div>
    </section>
  );
}



