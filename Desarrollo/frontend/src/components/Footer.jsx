import React from "react";
import heroImg from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={heroImg} alt="La Chacra Logo" className="footer-logo" />
      </div>
      <div className="footer-right">
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <p>
            <FontAwesomeIcon icon={faFacebook} /> @lachacragourmet
          </p>
          <p>
            <FontAwesomeIcon icon={faInstagram} /> @lachacragourmet
          </p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>
            <FontAwesomeIcon icon={faWhatsapp} /> 099779388
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
