import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CarruselContenedor from './CarruselContenedor';

const  api_key = process.env.REACT_APP_API_KEY;

const Contenedor = styled.div`
    width: 100%; 
`

const Api = () => {
    const [ data, setData ] = useState([]);

    useEffect(()=> {
        getMovies(); 
    }, [])

    async function getMovies() {
        try {
            const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=es-MX&page=1`
            );
    
            const pages = response.data.total_pages;
            const movies = [];
    
            for (let page = 1; page <= pages; page++) {
            const pageResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=es-MX&page=${page}`
            );
            movies.push(pageResponse.data.results);
            }
    
            setData(movies);
        } catch (error) {
            console.error(error);
        }
        }
    
        return (
        <Contenedor>
            {data.map((pageMovies, pageIndex) => (
            <CarruselContenedor key={pageIndex} items={pageMovies} />
            ))}
        </Contenedor>
        );
    };

export default Api;