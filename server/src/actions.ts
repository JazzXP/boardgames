import { List, Map } from 'immutable';
import { ADD_ENTRY, SET_ENTRIES } from './constants';
import { BOARDGAME_SERVER_STATE, BOARDGAME, BoardgameServerState } from './state';

type _BOARDGAME_SERVER_ACTION = {
    type: ADD_ENTRY | SET_ENTRIES | '';
}

export type BOARDGAME_SERVER_ACTION = _BOARDGAME_SERVER_ACTION & BOARDGAME_SERVER_STATE;

export function setEntries(state: BoardgameServerState, entries: List<BOARDGAME> | Array<BOARDGAME>): BoardgameServerState {
    return state.set('games', List(entries))
}

export function addEntry(state: BoardgameServerState, entry: BOARDGAME) {
    return state.update('games', (games: List<BOARDGAME>) => games.push(entry));
}