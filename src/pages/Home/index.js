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
    const itensPorPagina = 10;

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
        return <Box p='5'>
            <Pagination
                count={contador}
                size='large'
                page={pagina}
                variant='outlined'
                shape='rounded'
                onChange={handleChange}
            />
            <List p='10' pt='3' spacing={2}>
                {listaAtual().map((digimon, index) => {
                    return (
                        <ListItem key={index} listStyleType='disc'>
                            <span>{digimon.name}</span>
                            <Divider display='inline' orientation='vertical' />
                            <span> {digimon.level}</span>
                            <Divider display='inline' orientation='vertical' />
                            <img src={digimon.img} alt={digimon.img} />
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