import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

const ControlBar = ({
  searchValue,
  onSearchChange,
  filters = [],
  buttons = [],
  onClearFilters, // ✅ Nuevo prop opcional
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div
      className={`hs-controls-bar bg-[#0D0F10] text-white p-3 rounded-lg shadow-md`}
    >
      {/* 🔍 Barra de búsqueda */}
      <div className="hs-search-section">
        <div className="hs-search-input-container">
          <input
            type="text"
            placeholder="Buscar"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="hs-search-input"
          />
          <FontAwesomeIcon icon={faSearch} className="hs-search-icon" />
        </div>

        {filters.length > 0 && (
          <button
            className="hs-filter-btn"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <span>Filtrar</span>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        )}
      </div>

      {/* 🎛️ Submenú de filtros */}
      {filters.length > 0 && (
        <div
          className={`hs-date-filter-wrapper text-black ${
            showFilters ? "visible" : ""
          }`}
        >
          <div className="et-filters-container">
            {filters.map((f, idx) => (
              <div className="et-filter-group" key={idx}>
                {f.label && <label>{f.label}:</label>}

                {/* SELECT */}
                {f.type === "select" && (
                  <select
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                    className="hs-date-select"
                  >
                    {f.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {/* DATE */}
                {f.type === "date" && (
                  <>
                    <select
                      value={f.value}
                      onChange={(e) => f.onChange(e.target.value)}
                      className="hs-date-select"
                    >
                      {f.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {f.customComponent && (
                      <div className="hs-date-picker-container">
                        {f.customComponent}
                      </div>
                    )}
                  </>
                )}

                {/* ✅ NUMBER */}
                {f.type === "number" && (
                  <input
                    type="number"
                    placeholder={f.placeholder || ""}
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                    className="hs-date-select"
                    style={{ padding: "6px 8px" }}
                  />
                )}

                {/* ✅ CUSTOM */}
                {f.type === "custom" && f.customComponent}
              </div>
            ))}

            {/* ✅ Botón “Limpiar filtros” dentro del submenú */}
            {onClearFilters && (
              <div className="et-filter-group mt-2">
                <button
                  onClick={onClearFilters}
                  className="hs-export-btn bg-[#E6E6F1] text-black hover:bg-[#DADAE3] transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ⚙️ Botones de acción principales */}
      {buttons.map((b, idx) => (
        <button key={idx} className="hs-export-btn" onClick={b.onClick}>
          <span>{b.label}</span>
          {b.icon && <FontAwesomeIcon icon={b.icon} />}
        </button>
      ))}
    </div>
  );
};

export default ControlBar;
