import * as React from 'react';
import { GamesListContainer } from './GamesList';
import { GamePageContainer } from './GamePage';
import { AddGamePageContainer } from './AddGame';
import { MenuBar } from './MenuBar';
import { Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import axios from 'axios'
import { AxiosInstance } from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

//import gameEditReducer from './redux/gameEditReducer';
import { combineReducers } from 'redux-immutable';
import loginReducer from '../redux/loginReducer'
import gameEditReducer from '../redux/gameEditReducer';
import gamesReducer from '../redux/gamesReducer';
import editModeReducer from '../redux/editModeReducer';
import { BoardgameServerState } from '../redux/state';
import { SET_EDIT_MODE } from '../redux/constants';
import { doValidateLogin } from '../redux/loginActions';

export class App extends React.Component<{className: string}, {}> {
    public store: Store<BoardgameServerState>;
    public client: AxiosInstance;
    
    constructor() {
        super();
        this.client = axios.create({
            baseURL: 'http://localhost:3030/api/v1',
            responseType: 'json'
        });
        this.store= createStore(
            combineReducers(
                {
                    editMode: editModeReducer,
                    loggedIn: loginReducer,
                    game: gameEditReducer,
                    games: gamesReducer
                }
            ),
            applyMiddleware(axiosMiddleware(this.client))
        ) as Store<BoardgameServerState>;
    }

    componentWillMount() {
        this.store.dispatch(doValidateLogin());
    }

    render() {
        const routes = 
        <div className={this.props.className}>
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