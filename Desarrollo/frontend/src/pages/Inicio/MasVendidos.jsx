import React from 'react';
import popularImg from '../../assets/hero.jpeg';
import Footer from '../../components/Footer'; 

const MasVendidos = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="p-8 flex-grow">
                <h2 className="text-2xl font-bold mb-4">Nuestros Mejores Platos</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    <div className="border p-4 rounded min-w-[200px]">
                        <img src={popularImg} alt="Pizza a la Piedra" />
                        <h3 className="mt-2 font-semibold">Pizza a la Piedra</h3>
                        <span className="text-red-600 font-bold">Más Vendido</span>
                    </div>
                    {/* Agregar más platos aquí */}
                </div>
            </section>

            <Footer /> 
        </div>
    );
};

export default MasVendidos;
