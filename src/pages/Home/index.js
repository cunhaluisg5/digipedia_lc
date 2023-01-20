import React, { useState, useEffect } from 'react';
import { Box, List, ListItem } from '@chakra-ui/core';
import { Pagination } from '@material-ui/lab';
import ActivityIndicator from 'react-activity-indicator'

import './home.css';
import api from '../../services/api';
import Header from '../../components/Header'

const Home = () => {
    const [listaDigimon, setListaDigimon] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [contador, setContador] = useState(0);
    const [paginaMaxima, setPaginaMaxima] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const itensPorPagina = 2;

    useEffect(() => {
        const carregaDigimon = async () => {
            setLoaded(true);
            await api.get('/')
                .then((res) => {
                    const lista = res.data;
                    setListaDigimon(lista);
                    setContador(Math.ceil(lista.length / itensPorPagina));
                    setPaginaMaxima(Math.ceil(lista.length / itensPorPagina))
                })
                .catch((error) => {
                    console.log('Erro ao buscar digimon: ', error);
                });
            setLoaded(false);
        }
        carregaDigimon();
    }, []);

    const handleChange = (e, p) => {
        setPagina(p);
        avancaPagina(p);
    };

    const listaAtual = () => {
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;
        return listaDigimon.slice(inicio, fim);
    }

    const avancaPagina = (pagina) => {
        const numeroPagina = Math.max(1, pagina);
        setPaginaAtual(Math.min(numeroPagina, paginaMaxima));
    }

    const renderLista = () => {
        return <Box className='box' p='5'>
            <Pagination
                count={contador}
                size='large'
                page={pagina}
                variant='outlined'
                shape='rounded'
                onChange={handleChange}
                className='pagina'
            />
            <List className='lista'>
                {listaAtual().map((digimon, index) => {
                    return (
                        <ListItem className='item' key={index}>
                            <span className='nomeDigimon'>{digimon.name}</span>
                            <img className='imagemDigimon' src={digimon.img} alt={digimon.img} />
                            <span className='tipoDigimon'>{digimon.level}</span>
                        </ListItem>
                    );
                })}
            </List>
            <Pagination
                count={contador}
                size='large'
                page={pagina}
                variant='outlined'
                shape='rounded'
                onChange={handleChange}
                className='pagina'
            />
        </Box>
    }

    const loader = () => {
        if (loaded) {
            return (<div className='loader' style={{ textAlign: 'center' }}>
                <ActivityIndicator className='activity-indicator' number={3} duration={100} activeColor="#0070bf" borderWidth={2} 
                    borderRadius="50%" diameter={25} />
            </div>)
        }
    }


    return (
        <div className='container'>
            {loader()}
            {listaDigimon.length > 0 && <Header titulo='DIGIPÉDIA' />}
            {listaDigimon.length > 0 && renderLista()}
        </div>
    )
}

export default Home;