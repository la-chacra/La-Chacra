import React from 'react';

const Horarios = () => {
    return (
        <section className="flex flex-col md:flex-row justify-around p-8 bg-[#F6F1E7]">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold">Horarios</h2>
                <p>Viernes y Sábados: <br /> 11:30 a.m. - 14:30 p.m. <br /> 8:30 p.m. - 12 a.m.</p>
                <p>Domingos: <br /> 11:30 a.m. - 14:30 p.m.</p>
            </div>
            <div className="mt-4 md:mt-0">
                <h2 className="text-2xl font-bold">¿Dónde estamos?</h2>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=..." 
                    width="300" 
                    height="200" 
                    allowFullScreen="">
                </iframe>
            </div>
            <button className="mt-4 bg-[#A65D03] px-4 py-2 rounded">Hacé tu reserva</button>
        </section>
    );
};

export default Horarios;