import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from '../../hook/useLocalStorage';

export const InfoPokemonScreen = ({history}) => {

    const { pokemonId } = useParams();
    const [pok, setPok] = useLocalStorage('pokemon', '');

    React.useEffect(() => {
        obtenerDatos()
        
    },[pokemonId]);
    
    const obtenerDatos = async () => {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        const pokemon = await data.json();
        setPok(pokemon);
    }

    const stats = pok.stats;
    const type = pok.types; 
    // const {dream_world, ...res} = pok.sprites.other;
    // const obj = Object.values(res);
    // const imgn = (obj[0].front_default);
    // console.log(imgn);
   
    const handleReturn = () => {

        if( history.length <=2 ) {
            history.push('/');
        } else {
            history.goBack();
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={ pok.sprites.other.dream_world.front_default }
                    alt={ pok.name }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3> { pok.name } </h3>
                <div className="row mt-5">
                    <div className="col-6">
                         <h4>Stats</h4>
                         <ul className="list-group list-group-flush">
                            {
                                stats.map( (st, i)  => (
                                    <li className="list-group-item" key={i}>{st.stat.name}: {st.base_stat} </li>
                                ))
                            } 
                         </ul>
                     </div>
                     <div className="col-6">
                     <h4>Elementos</h4>
                         <ul className="list-group list-group-flush">
                             {
                                 type.map( (tp, i)  => (
                                     <li className="list-group-item" key={i}>{tp.type.name}</li>
                                 ))
                             }
                         </ul>
                     </div>
                </div>
                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>

            </div>

        </div>
    )
}
