import {
    FetchGameAction,
    SET_EDIT_MODE,
    GameEdit
} from './constants';
import {
    FetchGame,
    FetchGamesSuccess,
    FetchGameSuccess,
    SetEditMode,
} from './action_types';

import { 
    GameEditNameAction,
    GameEditMinPlayersActionSuccess,
    GameEditMaxPlayersActionSuccess,
    GameEditBoxArtActionSuccess,
    GameEditBBGLinkActionSuccess
 } from './gameEditActionTypes'

import { List, fromJS } from 'immutable';
import { BoardgameServerState, INITIAL_STATE, BOARDGAME } from './state';

type AllActions =   FetchGameSuccess | 
                    FetchGamesSuccess | 
                    SetEditMode | 
                    GameEditNameAction | 
                    GameEditMinPlayersActionSuccess | 
                    GameEditMaxPlayersActionSuccess | 
                    GameEditBoxArtActionSuccess | 
                    GameEditBBGLinkActionSuccess

export function setEntries(state: BoardgameServerState, entries: List<BOARDGAME> | Array<BOARDGAME>): BoardgameServerState {
    return state.set('games', List(entries))
}

export function addEntry(state: BoardgameServerState, entry: BOARDGAME): BoardgameServerState {
    return state.update('games', (games: List<BOARDGAME>) => games.push(entry));
}

export function serverSetList(state: BoardgameServerState, entries: List<BOARDGAME>): BoardgameServerState {
    return state.set('games', entries);
}

export function fetchGame(state: BoardgameServerState, game: string): BoardgameServerState {
    return state.merge({
        game: game, 
        isFetching: true
    });
}

function fetchGamesSuccess(state: BoardgameServerState, games: Array<string>) {
    let gamesList: List<BOARDGAME> = List( games.map((game) => {
        return {
            name: game
        } as BOARDGAME;
    }));
    return state.merge({
        games: gamesList
    });
}

function fetchGameSuccess(state: BoardgameServerState, game: BOARDGAME) {
    return state.merge({
        game: game
    });
}

export default function reducer(state: BoardgameServerState = INITIAL_STATE, action: AllActions): BoardgameServerState {
    let newState: BoardgameServerState = fromJS(state);
    switch (action.type) {
        case FetchGameAction.FETCH_GAMES_SUCCESS:
            return fetchGamesSuccess(newState, action.payload.data.games)
        case FetchGameAction.FETCH_GAME_SUCCESS:
            return fetchGameSuccess(newState, action.payload.data.game)
        case SET_EDIT_MODE:
            return newState.set('editMode', action.editMode);
        case GameEdit.GAME_EDIT_NAME:
            //return newState.setIn(['game', 'name'], action.name);
            return newState;
        case GameEdit.GAME_EDIT_MIN_PLAYERS_SUCCESS:
            return newState.merge({game: action.payload.data.game});
        case GameEdit.GAME_EDIT_MAX_PLAYERS_SUCCESS:
            return newState.merge({game: action.payload.data.game});
        case GameEdit.GAME_EDIT_BOX_ART_SUCCESS:
            return newState.merge({game: action.payload.data.game});
        case GameEdit.GAME_EDIT_BBG_LINK_SUCCESS:
            return newState.merge({game: action.payload.data.game});
    }
    return newState;
}