import { ADD_ENTRY, FETCH_GAME_SUCCESS, FETCH_GAMES_SUCCESS, SERVER_SET_LIST, SET_ENTRIES } from './constants';
import { AddEntry, FetchGame, ServerSetList, SetEntriesAction, FetchGameSuccess, FetchGamesSuccess } from './action_types';
import { List, fromJS } from 'immutable';
import { BoardgameServerState, INITIAL_STATE, BOARDGAME } from './state';

type AllActions = SetEntriesAction | AddEntry | ServerSetList | FetchGameSuccess | FetchGamesSuccess

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
        case ADD_ENTRY:
            return addEntry(newState, action.entry);
        case SET_ENTRIES:
            return setEntries(newState, action.entries);
        case SERVER_SET_LIST:
            return serverSetList(newState, action.games);
        case FETCH_GAMES_SUCCESS:
            return fetchGamesSuccess(newState, action.payload.data.games)
        case FETCH_GAME_SUCCESS:
            return fetchGameSuccess(newState, action.payload.data.game)
    }
    return newState;
}