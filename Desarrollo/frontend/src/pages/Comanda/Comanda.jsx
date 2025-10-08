import React, { useState, useEffect } from 'react';
import Header from "../../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheck, faTimes, faArrowLeft, faDownload, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

const OrderManagement = () => {
  const [n_mesa, setN_mesa] = useState('');
  const [numPersonas, setNumPersonas] = useState('');
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nota, setNota] = useState('');
  const [estado, setEstado] = useState('EnProceso');
  const [availableProductos, setAvailableProductos] = useState([]);

  useEffect(() => {
    /**
     * aquí es donde se deben obtener los productos disponibles desde el backend.
     * 
     * el frontend necesita recibir una lista de productos activos y disponibles 
     * para ser agregados a la comanda
     * 
     * una vez el backend esté listo, aquí debería hacerse la llamada 
     * para obtener esos datos (por ejemplo, una solicitud al servidor 
     * que devuelva la lista de productos).
     */
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

  const handleSaveComanda = () => {
    const comandaData = { 
      n_mesa, 
      numPersonas, 
      productos: selectedProductos, 
      nota, 
      estado, 
      total: calculateTotal() 
    };
    console.log('Guardando comanda:', comandaData);

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
      case 'Finalizado':
        return <FontAwesomeIcon icon={faCheck} className="om-status-icon om-green" />;
      case 'Cancelado':
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
          <button className="om-back-button">
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
                type="text"
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
                type="text"
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
                  <option value="EnProceso">En Proceso</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
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
