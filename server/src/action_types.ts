import { BOARDGAME } from './state';
import * as CONSTANTS from './constants';
import { List } from 'immutable';

export type SetEntriesAction = {
    type: CONSTANTS.SET_ENTRIES,
    entries: List<BOARDGAME> | Array<BOARDGAME>
}

export type AddEntry = {
    type: CONSTANTS.ADD_ENTRY,
    entry: BOARDGAME
}