import { BOARDGAME } from './state';
import { SET_EDIT_MODE, SET_BOARDGAME_STATE, FetchGameAction } from './constants';
import { List } from 'immutable';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type FetchGame = {
    type: FetchGameAction.FETCH_GAME,
    payload: {
        request: AxiosRequestConfig
    }
}

export type FetchGameSuccess = {
    type: FetchGameAction.FETCH_GAME_SUCCESS,
    payload: AxiosResponse
}

export type FetchGames = {
    type: FetchGameAction.FETCH_GAMES,
    payload: {
        request: AxiosRequestConfig
    };
}

export type FetchGamesSuccess = {
    type: FetchGameAction.FETCH_GAMES_SUCCESS,
    payload: AxiosResponse
}

export type SetEditMode = {
    type: SET_EDIT_MODE,
    editMode: boolean
}

export type SetBoardGameState = {
    type: SET_BOARDGAME_STATE,
    game: BOARDGAME
}