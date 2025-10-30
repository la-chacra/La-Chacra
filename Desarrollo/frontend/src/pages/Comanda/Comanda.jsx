import React, { useState, useEffect } from 'react';
import Header from "../../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faClipboardList, faCheckCircle, faCheckDouble, faTimesCircle, faCheck, faTimes, faArrowLeft, faDownload, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {

  const navigate = useNavigate();

  const [n_mesa, setN_mesa] = useState('');
  const [comanda_id, setComandaId] = useState('');
  const [numPersonas, setNumPersonas] = useState('');
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nota, setNota] = useState('');
  const [estado, setEstado] = useState('EnProceso');
  const [availableProductos, setAvailableProductos] = useState([]);

  useEffect(() => {
    // Para testing sin backend: cargar un JSON local con productos de prueba.
    // Esto permite probar la UI y seleccionar productos mientras el backend
    // no está disponible. Reemplazar por la llamada real al backend cuando
    // se integre.
    const loadLocalProducts = async () => {
      try {
        const resp = await fetch('/src/pages/Comanda/productos.json', { cache: 'no-store' });
        if (!resp.ok) return;
        const data = await resp.json();
        // Filtrar solo productos activos y con precio numérico
        const activos = Array.isArray(data)
          ? data.filter(p => p.activo !== false && !isNaN(Number(p.precio)))
          : [];
        setAvailableProductos(activos);
      } catch (err) {
        // Silencioso en testing; si se quiere depurar, usar console.error
        // console.error('Error cargando productos locales', err);
      }
    };

    loadLocalProducts();
  }, []);

  const handleN_mesaChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setN_mesa(value);
  };

  const handleNumPersonasChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setNumPersonas(value);
  };

  const handleNotaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) setNota(value);
  };

  const handleAddProducto = (producto) => {
    setSelectedProductos([...selectedProductos, producto]);
  };

  const handleRemoveProducto = (index) => {
    const newProductos = selectedProductos.filter((_, i) => i !== index);
    setSelectedProductos(newProductos);
  };

  const calculateTotal = () => {
    return selectedProductos.reduce((total, producto) => total + producto.precio, 0);
  };

  const handleSaveComanda = async () => {
    const comandaData = { 
      nMesa: n_mesa, 
      numPersonas: numPersonas, 
      productos: selectedProductos, 
      nota: nota, 
      estado: estado, 
      total: calculateTotal() 
    };

    /**
     * cuando el usuario guarde la comanda, esta información debe enviarse 
     * al servidor para guardarse en la base de datos.
     * 
     * - n_mesa
     * - numPersonas
     * - productos
     * - nota
     * - estado
     * - total
     */

    try {
      const respuesta = await fetch("/api/gestion/comanda/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(comandaData),
      });

      const dataRes = await respuesta.json();

      if (dataRes.success) {
        alert("Comanda exitosa");
        setComandaId(dataRes["data"]["comanda_id"])
      } else {
        alert("Error: " + dataRes.message);
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  const handleSaveAndPrint = () => {
    const comandaData = { 
      n_mesa, 
      numPersonas, 
      productos: selectedProductos, 
      nota, 
      estado, 
      total: calculateTotal() 
    };
    console.log('Guardando e imprimiendo comanda:', comandaData);

    /**
     * esta función debe hacer lo mismo que guardar la comanda, 
     * pero además deberia activar el proceso de impresión del pedido 
     * (mandar la información a la impresora).
     */
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'EnProceso':
        return <FontAwesomeIcon icon={faClock} className="om-status-icon om-blue" />;
      case 'Realizada':
        return <FontAwesomeIcon icon={faClipboardList} className="om-status-icon om-blue" />;
      case 'Confirmada':
        return <FontAwesomeIcon icon={faCheckCircle} className="om-status-icon om-green" />;
      case 'Finalizada':
        return <FontAwesomeIcon icon={faCheckDouble} className="om-status-icon om-green" />;
      case 'Cancelada':
        return <FontAwesomeIcon icon={faTimes} className="om-status-icon om-red" />;
      default:
        return <FontAwesomeIcon icon={faClock} className="om-status-icon om-blue" />;
    }
  };

  const filteredProductos = availableProductos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="om-order-management font-montserrat">
      <Header />

      <div className="om-content">
        <div className="om-header-actions">
          <button className="om-back-button" onClick={() => navigate("/gestion/comanda-historial")}>
            <FontAwesomeIcon icon={faArrowLeft} /> {/*se necesita pagina de historial de comanda*/}
            Volver a Historial de Comandas
          </button>
          <button className="om-export-button">
            Exportar
            <FontAwesomeIcon icon={faDownload} /> {/*aun se tiene que incorporar el export*/}
          </button>
        </div>

        <div className="om-main-content">
          <div className="om-left-section">
            {/* NUMERO MESA */}
            <div className="om-mesa-section">
              <h3>Número de Mesa</h3>
              <input
                type="number"
                min="1"
                max="20"
                placeholder="Ingresar Número de Mesa"
                value={n_mesa}
                onChange={handleN_mesaChange}
                className="om-mesa-input"
              />
            </div>

            {/* NUMERO PERSONAS */}
            <div className="om-cdp-section">
              <h3>Cantidad de Personas</h3>
              <input
                type="number"
                min="1"
                max="20"
                placeholder="Ingresar Número de Personas"
                value={numPersonas}
                onChange={handleNumPersonasChange}
                className="om-cdp-input"
              />
            </div>

            {/* PRODUCTOS */}
            <div className="om-articulos-section">
              <h3>Productos ({selectedProductos.length})</h3>
              <div className="om-search-container">
                <FontAwesomeIcon icon={faSearch} className="om-search-icon" />
                <input
                  type="text"
                  placeholder={`Buscar productos (${availableProductos.length})`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="om-search-input"
                />
              </div>

              <div className="om-available-items">
                {filteredProductos.map((producto, index) => (
                  <div key={index} className="om-item-row" onClick={() => handleAddProducto(producto)}>
                    <div className="om-item-info">
                      <span className="om-item-name">{producto.nombre}</span>
                      <span className="om-item-price">${producto.precio}</span>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="om-divider" />  {/* <-- Add this line */}
              <div className="om-selected-items">
                {selectedProductos.map((producto, index) => (
                  <div key={index} className="om-selected-item">
                    <div className="om-item-info">
                      <span className="om-item-name">{producto.nombre}</span>
                      <span className="om-item-price">${producto.precio}</span>
                    </div>
                    <button 
                      className="om-remove-item"
                      onClick={() => handleRemoveProducto(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTA */}
            <div className="om-nota-section">
              <h3>Nota</h3>
              <textarea
                placeholder="Ingresar texto"
                value={nota}
                onChange={handleNotaChange}
                className="om-nota-textarea"
              />
              <div className="om-character-count">({nota.length}/200)</div>
            </div>

            {/* ESTADO */}
            <div className="om-estado-section">
              <h3>Estado</h3>
              <div className="om-status-dropdown">
                {getStatusIcon(estado)}
                <select 
                  value={estado} 
                  onChange={(e) => setEstado(e.target.value)}
                  className="om-status-select"
                >
                  <option value="Realizada">Realizada</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Finalizada">Finalizado</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECCIÓN DERECHA */}
          <div className="om-right-section">
            <div className="om-total-section">
              <h3>Precio total</h3>
              <div className="om-total-amount">${calculateTotal()} de {selectedProductos.length} productos</div>

              <div className="om-action-buttons">
                <button className="om-save-button" onClick={handleSaveComanda}>Guardar Comanda</button>
                <button className="om-save-print-button" onClick={handleSaveAndPrint}>Mandar a Imprimir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
