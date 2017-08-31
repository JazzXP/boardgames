import * as React from 'react';
import { GamesListContainer } from './GamesList';
import { GamePageContainer } from './GamePage';
import { AddGamePageContainer } from './AddGame';
import { MenuBar } from './MenuBar';
import { Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import axios from 'axios'
import { AxiosInstance } from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from '../redux/reducer';
//import gameEditReducer from './redux/gameEditReducer';
import { BoardgameServerState } from '../redux/state'


export class App extends React.Component<{}, {}> {
    public store: Store<BoardgameServerState>;
    public client: AxiosInstance;
    
    constructor() {
        super();
        this.client = axios.create({
            baseURL: 'http://localhost:3030/api/v1',
            responseType: 'json'
        });
        this.store= createStore(
            reducer, 
            applyMiddleware(axiosMiddleware(this.client))
        ) as Store<BoardgameServerState>;
    }

    render() {
        const routes = 
        <div>
            <MenuBar ref="left" alignment="left">
            </MenuBar>
            <Route exact path="/" component={GamesListContainer} />
            <Route path="/games/:name" component={GamePageContainer} />
            <Route path="/addGame" component={AddGamePageContainer} />
        </div>

        return <Provider store={this.store}>
                    <HashRouter>
                        {routes}
                    </HashRouter>
                </Provider>;
    }
}