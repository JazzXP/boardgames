import { List, Map } from 'immutable';
import { FetchGameAction, SET_EDIT_MODE, SET_BOARDGAME_STATE } from './constants';
import { BOARDGAME_SERVER_STATE, BOARDGAME, BoardgameServerState } from './state';

type _BOARDGAME_SERVER_ACTION = {
    type: FetchGameAction.FETCH_GAME | SET_EDIT_MODE | SET_BOARDGAME_STATE | '';
}

export type BOARDGAME_SERVER_ACTION = _BOARDGAME_SERVER_ACTION & BOARDGAME_SERVER_STATE;

export function fetchGame(game: string): BOARDGAME_SERVER_ACTION {
    return {
        type: FetchGameAction.FETCH_GAME,
        payload: {
            request: {
                method: 'get',
                url: `/games/${game}`
            }
        }
    }
}

export function fetchGames() {
    return {
        type: FetchGameAction.FETCH_GAMES,
        payload: {
            request: {
                method: 'get',
                url: '/games'
            }
        }
    }
}

export function setEditModeAction(editMode: boolean): BOARDGAME_SERVER_ACTION {
    return {
        type: SET_EDIT_MODE,
        editMode: editMode
    }
}

export function setBoardgameState(game: BOARDGAME): BOARDGAME_SERVER_ACTION {
    return {
        type: SET_BOARDGAME_STATE,
        game: game
    }
}