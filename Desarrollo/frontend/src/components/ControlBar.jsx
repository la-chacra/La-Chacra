import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

const ControlBar = ({
  searchValue,
  onSearchChange,
  filters = [],
  buttons = [],
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="hs-controls-bar">
      {/* 🔍 Sección de búsqueda */}
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

      {/* 🎚️ Submenú de filtros */}
      {filters.length > 0 && (
        <div
          className={`hs-date-filter-wrapper ${showFilters ? "visible" : ""}`}
        >
          <div className="et-filters-container">
            {filters.map((f, idx) => (
              <div className="et-filter-group" key={idx}>
                {f.label && <label>{f.label}:</label>}
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
                {f.type === "custom" && f.customComponent}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⚙️ Botones de acción */}
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
