import React from "react";

const ReservaActivaModal = ({ reserva, onClose, onCancel }) => {
  return (
    <div className="reserva-modal-overlay">
      <div className="reserva-modal">
        <h2>Reserva Activa</h2>

        <p className="text-neutral-900">
          <strong>Fecha y Hora:</strong> {reserva.fecha_hora}
        </p>

        <p className="text-neutral-900">
          <strong>Personas:</strong> {reserva.cant_personas}
        </p>

        <button className="close-modal-btn" onClick={onClose}>
          Cerrar
        </button>

        <button
          className="cancel-reserva-btn"
          onClick={onCancel}  // <--- Se cancela directamente
        >
          Cancelar Reserva
        </button>
      </div>
    </div>
  );
};

export default ReservaActivaModal;
