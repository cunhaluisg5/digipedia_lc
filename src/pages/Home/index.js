import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, Divider } from '@chakra-ui/core';
import { Pagination } from '@material-ui/lab';

import './home.css';
import api from '../../services/api';

const Home = () => {
    const [listaDigimon, setListaDigimon] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [contador, setContador] = useState(0);
    const [paginaMaxima, setPaginaMaxima] = useState(0);
    const itensPorPagina =2;

    useEffect(() => {
        const carregaDigimon = async () => {
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

    return (
        <div className='container'>
            <h1>Página Home</h1>
            {listaDigimon.length > 0 && renderLista()}
        </div>
    )
}

export default Home;