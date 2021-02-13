import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { InfoPokemonScreen } from '../components/pokemon/InfoPokemonScreen';
import { PokemonScreen } from '../components/pokemon/PokemonScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from '../components/ui/Navbar';

export const AppRouter = () => {
    return (
        <Router>
            <div> 
                <Navbar/>
                <div className="container mt-2">
                    <Switch>
                        <Route exact path="/pokemon" component={PokemonScreen} />
                        <Route exact path="/pokemon/:pokemonId" component={InfoPokemonScreen} />
                        <Route exact path="/search" component={SearchScreen} />
                        <Route exact path="/" component={PokemonScreen}/>

                        <Redirect to="/pokemon" />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
