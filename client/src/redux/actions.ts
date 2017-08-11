import { List, Map } from 'immutable';
import { ADD_ENTRY, FETCH_GAME, FETCH_GAMES, SERVER_SET_LIST, SET_ENTRIES } from './constants';
import { BOARDGAME_SERVER_STATE, BOARDGAME, BoardgameServerState } from './state';

type _BOARDGAME_SERVER_ACTION = {
    type: ADD_ENTRY | SET_ENTRIES | SERVER_SET_LIST | FETCH_GAME | '';
}

export type BOARDGAME_SERVER_ACTION = _BOARDGAME_SERVER_ACTION & BOARDGAME_SERVER_STATE;

export function setEntriesAction(entries: List<BOARDGAME> | Array<BOARDGAME>): BOARDGAME_SERVER_ACTION {
    const games = List<BOARDGAME>(entries);
    return {
        type: SET_ENTRIES,
        games
    }
}

export function addEntryAction(game: BOARDGAME): BOARDGAME_SERVER_ACTION {
    return {
        type: ADD_ENTRY,
        game
    }
}

export function serverSetListAction(gamesArray: Array<string>): BOARDGAME_SERVER_ACTION {
    const games = List(gamesArray.map((name) => { return { name: name } as BOARDGAME}));
    return {
        type: SERVER_SET_LIST,
        games
    }
}

export function fetchGame(game: string): BOARDGAME_SERVER_ACTION {
    return {
        type: FETCH_GAME,
        payload: {
            request: {
                method: 'get',
                url: '/game/:' + game
            }
        }
    }
}

export function fetchGames() {
    return {
        type: FETCH_GAMES,
        payload: {
            request: {
                method: 'get',
                url: '/games'
            }
        }
    }
}
