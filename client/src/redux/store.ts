import { createStore, Store } from 'redux';
import { combineReducers } from 'redux-immutable';
import { BoardgameServerState } from './state';
import loginReducer from './loginReducer';
import loginErrorReducer from './loginErrorReducer';
import gameEditReducer from './gameEditReducer';
import gamesReducer from './gamesReducer';

export default function makeStore(): Store<BoardgameServerState> {
    return createStore(combineReducers(
        {
            editMode: (state, action) => { return action.editMode },
            loggedIn: loginReducer,
            game: gameEditReducer,
            games: gamesReducer,
            loginErrorMessages: loginErrorReducer
        }
    )) as Store<BoardgameServerState>;
}