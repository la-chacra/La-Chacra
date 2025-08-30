import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
// (cuando agreguen más páginas, las importas acá)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* Ejemplo de otras rutas futuras */}
        {/* <Route path="/carta" element={<Carta />} /> */}
        {/* <Route path="/contacto" element={<Contacto />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
