import React, { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from '../selectors/getPokemonByUrl';
import { CardScreen } from './CardScreen';

export const PokemonScreen = () => {

   const [pokemons, setpokemons] = useState([]);
    useEffect(() => {
        const data = getAllPokemon('https://pokeapi.co/api/v2/pokemon?offset=0&limit=102');
        data.then(res => {
            dataPokemon(res.results);
        })
    }, []);

    const dataPokemon = async (data) => {
        const dataPokemon = await Promise.all(data.map(async pokemon => {
            const getPokeon = await getPokemon(pokemon)
            return getPokeon;
          }));
          setpokemons(dataPokemon);
    }

    return (
        <div>
            <h1 
                style={ { fontFamily: 'Pokemon-font, cursive'} }
            >
                Pokemons
            </h1>
            <hr className="mt-4" />
            <div className="card-columns animate__animated animate__fadeIn">
                {
                    pokemons.map( (pokemon, i)  => (
                        <CardScreen 
                            key={i}
                            pokemon={pokemon}
                        />
                    ))
                }
            </div>
            
        </div>
    )
}
