import { BOARDGAME } from './state';
import * as CONSTANTS from './constants';
import { List } from 'immutable';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type SetEntriesAction = {
    type: CONSTANTS.SET_ENTRIES,
    entries: List<BOARDGAME> | Array<BOARDGAME>
}

export type AddEntry = {
    type: CONSTANTS.ADD_ENTRY,
    entry: BOARDGAME
}

export type ServerSetList = {
    type: CONSTANTS.SERVER_SET_LIST,
    games: List<BOARDGAME>
}

export type FetchGame = {
    type: CONSTANTS.FETCH_GAME,
    payload: {
        request: AxiosRequestConfig
    }
}

export type FetchGameSuccess = {
    type: CONSTANTS.FETCH_GAME_SUCCESS,
    payload: AxiosResponse
}

export type FetchGames = {
    type: CONSTANTS.FETCH_GAMES,
    payload: {
        request: AxiosRequestConfig
    };
}

export type FetchGamesSuccess = {
    type: CONSTANTS.FETCH_GAMES_SUCCESS,
    payload: AxiosResponse
}

export type SetEditMode = {
    type: CONSTANTS.SET_EDIT_MODE,
    editMode: boolean
}