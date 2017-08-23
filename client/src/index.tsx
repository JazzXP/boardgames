import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './redux/reducer';
import gameEditReducer from './redux/gameEditReducer';
import { BoardgameServerState } from './redux/state'
import { GamesListContainer } from './components/GamesList';
import { GamePageContainer } from './components/GamePage';

const client = axios.create({
    baseURL: 'http://localhost:3030/api/v1',
    responseType: 'json'
});

const store: Store<BoardgameServerState> = createStore(
    reducer, 
    applyMiddleware(axiosMiddleware(client))
) as Store<BoardgameServerState>;



const routes = 
    <div>
        <Route exact path="/" component={GamesListContainer} />
        <Route path="/games/:name" component={GamePageContainer} />
    </div>

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            {routes}
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)