import React from 'react';
import { useForm } from '../../hook/useForm';
import { useLocalStorage } from '../../hook/useLocalStorage';
import { CardScreen } from '../pokemon/CardScreen';

export const SearchScreen = () => {

    const [ formValues, handleInputChange, reset ] = useForm({
        searchText: ''
    });
    const {searchText} = formValues;
    const [pok, setPok] = useLocalStorage('pokemonByName', '');
    
    const obtenerDatos = async (name) => {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const pokemon = await data.json();
        
        setPok(pokemon);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        obtenerDatos(searchText.toLowerCase().trim());
        reset();
    }

    return (
        <div>
            <h1 style={ { fontFamily: 'Pokemon-font, cursive'} }>Search Pokémon</h1>
            <hr />
            
            <div className="row">
                <div className="col-5">
                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your pokémon"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"
                            className="btn mt-2 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-7" style={ { maxWidth: 300, maxHeight: 300, textAlign: 'center'} }>
                    <h4 style={ { fontFamily: 'Pokemon-font, cursive'} }> Results </h4>
                    <hr/>
                    {
                        <div style={ { maxWidth: 300, maxHeight: 300, textAlign: 'center'} }>
                            <CardScreen 
                                key={pok.id}
                                pokemon={pok}
                            />
                        </div>
                    } 
                </div>
            </div>
        </div>
    )
}
