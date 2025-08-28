import React from 'react';

const Productos = () => {
    return (
        <section className="p-8 flex">
            <img src="/path/to/organic-product.jpg" alt="Productos" className="w-1/2 rounded" />
            <div className="ml-4">
                <h2 className="text-2xl font-bold">Productos</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </section>
    );
};
export default Productos;