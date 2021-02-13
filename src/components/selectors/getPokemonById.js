export const getPokemonById = async( id ) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const resp = await fetch( url );
    const { data } = await resp.json();

    const pokemon = data.map( pok => {
        return {
            pokemon: pok.id
        }
    })
    
    return pokemon

}