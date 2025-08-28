import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-[#3E5E4A] text-white">
            <div className="text-lg font-bold">La Chacra Gourmet</div>
            <nav className="flex space-x-4">
                <a href="#carta">Carta</a>
                <a href="#eventos">Eventos</a>
                <a href="#reservas">Reservas</a>
                <a href="#contacto">Contacto</a>
            </nav>
            <div className="flex items-center space-x-2">
                <select className="bg-[F6F1E7]">
                    <option value="">UY</option>
                    <option value="">EN</option>
                </select>
                <button className="bg-[#A65D03] px-4 py-2 rounded">Registrarse</button>
            </div>
        </header>
        
    );
};

export default Header;