import React from 'react';
import popularImg from '../../assets/hero.jpg';

const MasVendidos = () => {
    return (
        <section className="p-8">
            <h2 className="text-2xl font-bold">Nuestros Mejores Platos</h2>
            <div className="flex space-x-4">
                <div className="border p-4 rounded">


                    <img src={popularImg} alt="Pizza a la Piedra" />
                    <h3>Pizza a la Piedra</h3>
                    <span className="text-red-600">Más Vendido</span>
                </div>
                {/* Agregar más platos aquí */}
            </div>
        </section>
    );
};

export default MasVendidos;
