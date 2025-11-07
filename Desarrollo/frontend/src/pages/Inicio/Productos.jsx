import React from "react";
import productosOrganicos from "../../assets/productos-organicos.png";
import { useTranslation } from "react-i18next";

export default function Productos() {
  const { t } = useTranslation();

  return (
    <section className="po-section">
      <div className="po-sidebar po-sidebar-left"></div>
      <div className="po-sidebar po-sidebar-right"></div>

      <div className="po-container">
        <div className="po-card po-main-card">
          <div className="po-image-wrapper">
            <img
              src={productosOrganicos}
              alt="Productos orgánicos"
              className="po-image"
            />
          </div>
          <div className="po-content">
            <h2 className="po-title font-overlock">
              {t("productos.title")}
            </h2>
            <p className="po-text font-montserrat">
              {t("productos.paragraph")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
