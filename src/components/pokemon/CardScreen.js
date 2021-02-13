import React from 'react';
import { Link } from 'react-router-dom';

export const CardScreen = ({pokemon}) => {    

    return (
        <Link to={ `./pokemon/${ pokemon.id }`} style={{textDecoration: 'none', color: 'black'}}>
            <div className="card ms-3 animate__animated animate__fadeIn" style={ { maxWidth: 540, textAlign: 'center' } }>
                <img   
                    src={pokemon.sprites.other.dream_world.front_default} 
                    style={ { maxWidth: 240, maxHeight: 120} } 
                    alt={pokemon.name}
                    className="mt-3" 
                />
                                        
                <div className="card-body">
                    <h5 className="card-title"> { pokemon.name } </h5>
                </div>
            </div>
        </Link>    
    )

}