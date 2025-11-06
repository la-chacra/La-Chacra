import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCircleCheck,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

const WindowWarning = ({
  type = "alert", // "alert" | "confirm"
  message = "Mensaje",
  onConfirm,
  onCancel,
  icon = "warning", // "warning" | "success" | "error"
}) => {
  const getIcon = () => {
    switch (icon) {
      case "success":
        return faCircleCheck;
      case "error":
        return faCircleQuestion;
      default:
        return faTriangleExclamation;
    }
  };

  return (
    <div className="ww-overlay font-montserrat">
      <div className="ww-window">
        <FontAwesomeIcon icon={getIcon()} className="ww-icon" />
        <p className="ww-message">{message}</p>
        <div className="ww-buttons">
          {type === "confirm" ? (
            <>
              <button className="ww-btn ww-confirm" onClick={onConfirm}>
                Aceptar
              </button>
              <button className="ww-btn ww-cancel" onClick={onCancel}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="ww-btn ww-confirm" onClick={onConfirm}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WindowWarning;
