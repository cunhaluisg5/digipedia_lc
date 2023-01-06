import React, { useState, useEffect } from 'react';

import './home.css';
import api from '../../services/api';

const Home = () => {
    const [listaDigimon, setListaDigimon] = useState([]);

    useEffect(() => {
        const carregaDigimon = async () => {
            await api.get('/')
                .then((res) => {
                    const lista = res.data;
                    setListaDigimon(lista);
                })
                .catch((error) => {
                    console.log('Erro ao buscar digimon: ', error);
                });
        }
        carregaDigimon();
    }, []);

    const renderLista = () => {
        return(
            <div>
                {listaDigimon.map((digimon, index) => {
                    return <div key={index}>
                        <span>{digimon.name} + ' , ' + {digimon.level}</span>
                    </div>
                })}
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Página Home</h1>
            {listaDigimon.length > 0 && renderLista()}
        </div>
    )
}

export default Home;