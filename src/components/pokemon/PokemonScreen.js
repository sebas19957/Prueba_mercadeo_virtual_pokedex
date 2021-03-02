import React, { useEffect, useState } from 'react';
import { getPokemon } from '../selectors/getPokemonByUrl';
import { getAllPokemon } from '../selectors/getAllPokemon';
import { CardScreen } from './CardScreen';

export const PokemonScreen = () => {

    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await getAllPokemon('https://pokeapi.co/api/v2/pokemon')
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            await loadPokemon(response.results);
            setLoading(false);
        }
        fetchData();
    }, []);

    const next = async () => {
        setLoading(true);
        const data = await getAllPokemon(nextUrl);
        await loadPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }
    
      const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        const data = await getAllPokemon(prevUrl);
        await loadPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const loadPokemon = async (data) => {
        const dataPokemon = await Promise.all(data.map(async pokemon => {
            const pokemonRecord = await getPokemon(pokemon)
            return pokemonRecord
        }));
        setPokemonData(dataPokemon);
    }


    if (loading) {
        return (
            <div>
                <h1 style={{ fontFamily: 'Pokemon-font, cursive' }}>
                    Pokémons
                </h1>
                <hr className="mt-4" />
                <div style={{textAlign: 'center'}}>
                    <button  className="btn btn-primary mr-2 mb-3 mt-1" onClick={prev}>Prev</button>
                    <button className="btn btn-primary mb-3 mt-1" onClick={next}>Next</button>
                </div>
                <div className="alert alert-info">
                    Loading Pokemons...
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1
                style={{ fontFamily: 'Pokemon-font, cursive' }}
            >
                Pokémons
            </h1>
            <hr className="mt-4" />

            <div style={{textAlign: 'center'}}>
                <button  className="btn btn-primary mr-2 mb-3 mt-1" onClick={prev}>Prev</button>
                <button className="btn btn-primary mb-3 mt-1" onClick={next}>Next</button>
            </div>

            <div className="card-columns animate__animated animate__fadeIn">
                {
                    pokemonData.map(pokemon => (
                        <CardScreen
                            key={pokemon.id}
                            pokemon={pokemon}
                        />
                    ))
                }
            </div>

            <div style={{textAlign: 'center'}}>
                <button  className="btn btn-primary mr-2 mb-3 mt-1" onClick={prev}>Prev</button>
                <button className="btn btn-primary mb-3 mt-1" onClick={next}>Next</button>
            </div>
        </div>
    
    )
}
