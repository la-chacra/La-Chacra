import React, { useState, useEffect } from "react";
import WindowWarning from "../../components/Alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendar,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


const Perfil = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [correo, setCorreo] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [showNewPass, setShowNewPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const [errors, setErrors] = useState({});
  const [alertData, setAlertData] = useState(null);

  const navigate = useNavigate();

  // ALERTAS
  const showAlert = (message, icon = "warning") =>
    setAlertData({
      type: "alert",
      message,
      icon,
      onConfirm: () => setAlertData(null),
    });

  const showSuccess = (message) =>
    setAlertData({
      type: "alert",
      message,
      icon: "success",
      onConfirm: () => setAlertData(null),
    });

  const showError = (message) =>
    setAlertData({
      type: "alert",
      message,
      icon: "error",
      onConfirm: () => setAlertData(null),
    });

  const showConfirm = (message, onConfirm) =>
    setAlertData({
      type: "confirm",
      message,
      icon: "error",
      onConfirm: () => {
        setAlertData(null);
        onConfirm();
      },
      onCancel: () => setAlertData(null),
    });

  // GET DATA
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await fetch("/api/obtenerDatos", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!data.success) return showError("No se pudieron obtener tus datos.");

        setNombre(data.data.nombre);
        setApellido(data.data.apellido);
        setCorreo(data.data.correo);
        setFechaNac(data.data.fechaNacimiento);
      } catch {
        showError("Error cargando datos del perfil.");
      }
    };

    fetchDatos();
  }, []);

  // INPUT CONTAINER (arreglado)
  const inputContainer = (children, error = false) => (
    <div
      className={`flex items-center h-[52px] border rounded-xl bg-[#FAFAFA] transition-all 
      ${error ? "border-red-500" : "border-gray-300"}`}
    >
      {children}
    </div>
  );



  const onSalir = () => {
    navigate(-1);
  };

  // GUARDAR DATOS
  const handleGuardar = async () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = true;
    if (!apellido.trim()) newErrors.apellido = true;
    if (!correo.trim()) newErrors.correo = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return showAlert("Completa los campos obligatorios.");

    try {
      const res = await fetch("/api/usuario/actualizar", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          fecha_nacimiento: fechaNac,
          correo,
        }),
      });

      const data = await res.json();

      if (!data.success) return showError(data.message);

      showSuccess("Datos actualizados correctamente.");
    } catch {
      showError("Error interno del servidor.");
    }
  };

  // CAMBIAR PASS
  const handleCambiarPass = () => {
    const newErrors = {};

    if (!oldPass) newErrors.oldPass = true;
    if (!newPass) newErrors.newPass = true;
    if (!repeatPass) newErrors.repeatPass = true;

    if (newPass !== repeatPass)
      return showError("Las contraseñas no coinciden.");

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return showAlert("Completa los campos obligatorios.");

    showConfirm("¿Confirmas que deseas cambiar tu contraseña?", async () => {
      try {
        const res = await fetch("/api/usuario/cambiar-contraseña", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword: oldPass,
            newPassword: newPass,
          }),
        });

        const data = await res.json();

        if (!data.success) return showError(data.message);

        showSuccess("Contraseña actualizada correctamente.");

        setOldPass("");
        setNewPass("");
        setRepeatPass("");
      } catch {
        showError("Error interno del servidor.");
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#0F0F0F] pb-24 pt-10">

      {alertData && (
        <WindowWarning
          type={alertData.type}
          message={alertData.message}
          icon={alertData.icon}
          onConfirm={alertData.onConfirm}
          onCancel={alertData.onCancel}
        />
      )}

      {/* SALIR */}
      <div className="w-[90%] max-w-[1200px] mx-auto flex justify-end">
        <button
          onClick={onSalir}
          className="text-gray-300 border border-gray-600 px-4 py-2 rounded-xl text-sm hover:bg-gray-700 transition"
        >
          Cerrar ✕
        </button>
      </div>

      <h1 className="text-center text-white text-4xl font-serif mt-4 mb-12">
        Configuración de Perfil
      </h1>

      <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col gap-10">

        {/* ---------------- DATOS PERSONALES ---------------- */}
        <div className="bg-[#F5F5F5] p-8 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold text-[#222] mb-5">
            Datos Personales
          </h2>

          {/* NOMBRE */}
          <label className="text-sm text-gray-700 mb-1">Nombre</label>
          {inputContainer(
            <>
              <FontAwesomeIcon icon={faUser} className="ml-4 text-gray-500" />
              <input
                className="w-full text-neutral-900 h-full bg-transparent px-3 mt-3 leading-none outline-none"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </>,
            errors.nombre
          )}

          {/* APELLIDO */}
          <label className="text-sm text-gray-700 mt-4 mb-1">Apellido</label>
          {inputContainer(
            <>
              <FontAwesomeIcon icon={faUser} className="ml-4 text-gray-500" />
              <input
                className="w-full text-neutral-900 h-full bg-transparent px-3 mt-3 leading-none outline-none"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </>,
            errors.apellido
          )}

          {/* FECHA */}
          <label className="text-sm text-gray-700 mt-4 mb-1">
            Fecha de nacimiento
          </label>
          {inputContainer(
            <>
              <FontAwesomeIcon icon={faCalendar} className="ml-4 text-gray-500" />
              <input
                type="date"
                className="w-full text-neutral-900 h-full bg-transparent px-3 mt-3 leading-none outline-none"
                value={fechaNac}
                onChange={(e) => setFechaNac(e.target.value)}
              />
            </>
          )}

          {/* CORREO */}
          <label className="text-sm text-gray-700 mt-4 mb-1">
            Correo electrónico
          </label>
          {inputContainer(
            <>
              <FontAwesomeIcon icon={faEnvelope} className="ml-4 text-gray-500" />
              <input
                className="w-full text-neutral-900 h-full bg-transparent px-3 mt-3 leading-none outline-none"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </>,
            errors.correo
          )}

          {/* GUARDAR */}
          <button
            onClick={handleGuardar}
            className="w-full py-3 rounded-xl text-white text-lg tracking-wide mt-8
            bg-gradient-to-r from-[#B8894B] to-[#8B5E26] hover:opacity-90 transition"
          >
            Guardar cambios
          </button>
        </div>

        {/* ---------------- SEGURIDAD ---------------- */}
        <div className="bg-[#F5F5F5] p-8 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold text-[#222] mb-5">Seguridad</h2>

          {/* ACTUAL */}
          <label className="text-sm text-gray-700 mb-1">Contraseña actual</label>
          {inputContainer(
            <>
              <FontAwesomeIcon icon={faLock} className="ml-4 text-gray-500" />
              <input
                type="password"
                className="w-full text-neutral-900 h-full bg-transparent px-3 mt-3 leading-none outline-none"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </>,
            errors.oldPass
          )}

          {/* NUEVA */}
          <label className="text-sm text-gray-700 mt-4 mb-1">Nueva contraseña</label>
          {inputContainer(
            <>
              <FontAwesomeIcon icon={faLock} className="ml-4 text-gray-500" />
              <input
                type={showNewPass ? "text" : "password"}
                className="w-full text-neutral-900 h-full bg-transparent px-3 mt-3 leading-none outline-none"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />

              <button
                className="mr-4 text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowNewPass(!showNewPass)}
              >
                <FontAwesomeIcon icon={showNewPass ? faEyeSlash : faEye} />
              </button>
            </>,
            errors.newPass
          )}

          {/* REPETIR */}
          <label className="text-sm text-gray-700 mt-4 mb-1">
            Repetir contraseña
          </label>
          {inputContainer(
            <>
              <FontAwesomeIcon icon={faLock} className="ml-4 text-gray-500" />
              <input
                type={showRepeatPass ? "text" : "password"}
                className="w-full text-neutral-900 h-full bg-transparent px-3 mt-3 leading-none outline-none"
                value={repeatPass}
                onChange={(e) => setRepeatPass(e.target.value)}
              />
              <button
                className="mr-4 text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowRepeatPass(!showRepeatPass)}
              >
                <FontAwesomeIcon icon={showRepeatPass ? faEyeSlash : faEye} />
              </button>
            </>,
            errors.repeatPass
          )}

          {/* BOTÓN */}
          <button
            onClick={handleCambiarPass}
            className="w-full py-3 rounded-xl text-white text-lg tracking-wide mt-8
            bg-gradient-to-r from-[#6A8CB6] to-[#375879] hover:opacity-90 transition"
          >
            Actualizar contraseña
          </button>
        </div>

      </div>
    </div>
  );
};

export default Perfil;
