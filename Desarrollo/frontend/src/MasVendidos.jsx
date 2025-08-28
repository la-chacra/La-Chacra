import React from 'react';

const MasVendidos = () => {
    return (
        <section className="p-8">
            <h2 className="text-2xl font-bold">Nuestros Mejores Platos</h2>
            <div className="flex space-x-4">
                <div className="border p-4 rounded">
                    <img src="/path/to/image.jpg" alt="Pizza a la Piedra" />
                    <h3>Pizza a la Piedra</h3>
                    <span className="text-red-600">Más Vendido</span>
                </div>
                {/* Agregar más platos aquí */}
            </div>
        </section>
    );
};

export default MasVendidos;
