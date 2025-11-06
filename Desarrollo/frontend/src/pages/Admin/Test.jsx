import React, { useState } from "react";
import WindowWarning from "../../components/Alert";

function App() {
  // estos tres estados controlan si cada ventana (alerta, confirmación o éxito) se muestra o no.
  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  return (
    <div>
      {/* 
        estos botones son solo ejemplos para mostrar cómo se puede activar
        cada tipo de ventana desde la interfaz.
        en un flujo real, estas funciones se podrían llamar después de una
        acción del backend (por ejemplo, después de guardar, eliminar, o detectar error)
      */}
      <button className="p-4" onClick={() => setAlertVisible(true)}>Mostrar Alerta</button>
      <button className="p-4" onClick={() => setConfirmVisible(true)}>Mostrar Confirmación</button>
      <button className="p-4" onClick={() => setSuccessVisible(true)}>Mostrar Éxito</button>

      {/* 
        ALERTA SIMPLE (equivalente a window.alert())
        -------------------------------------------------
        - muestra un mensaje de advertencia al usuario.
        - solo tiene un botón de "OK"
        - se usa para avisar errores o campos incompletos
      */}
      {alertVisible && (
        <WindowWarning
          message="Por favor completa todos los campos obligatorios."
          onConfirm={() => setAlertVisible(false)} // cierra la ventana al confirmar
          icon="warning"
        />
      )}

      {/* 
        MENSAJE CONFIRMACIÓN (equivalente a window.confirm())
        -------------------------------------------------
        - muestra una pregunta al usuario con botones "Aceptar" y "Cancelar".
        - onConfirm() se ejecuta si el usuario acepta.
        - onCancel() se ejecuta si el usuario cancela.
      */}
      {confirmVisible && (
        <WindowWarning
          type="confirm" // Indica que es un cuadro de confirmación
          message="¿Seguro que quieres eliminar este producto?"
          onConfirm={() => {
            // aquí se podría llamar una función del backend para eliminar el producto
            setConfirmVisible(false); // como ejemplo, este cierra la ventana después de confirmar
          }}
          onCancel={() => setConfirmVisible(false)} // cierra la ventana si el usuario cancela
          icon="error" 
        />
      )}

      {/* 
        MENSAJE SUCCESS
        -------------------------------------------------
        - se usa para indicar que una acción se completó correctamente
        - solo tiene botón de "OK"
      */}
      {successVisible && (
        <WindowWarning
          message="¡El producto se guardó correctamente!"
          onConfirm={() => setSuccessVisible(false)} // cierra la ventana al confirmar
          icon="success"
        />
      )}
    </div>
  );
}

export default App;
