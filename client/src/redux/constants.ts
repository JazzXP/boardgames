export enum FetchGameAction {
    FETCH_GAME = 'FETCH_GAME',
    FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS',
    FETCH_GAMES = 'FETCH_GAMES',
    FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS'
}

export type SET_EDIT_MODE = 'SET_EDIT_MODE';
export const SET_EDIT_MODE: SET_EDIT_MODE = 'SET_EDIT_MODE';

export type SET_BOARDGAME_STATE = 'SET_BOARDGAME_STATE';
export const SET_BOARDGAME_STATE: SET_BOARDGAME_STATE = 'SET_BOARDGAME_STATE';

export enum GameEdit {
    GAME_EDIT_NAME = 'GAME_EDIT_NAME',
    GAME_EDIT_NAME_SUCCESS = 'GAME_EDIT_NAME_SUCCESS',
    GAME_EDIT_MIN_PLAYERS = 'GAME_EDIT_MIN_PLAYERS',
    GAME_EDIT_MIN_PLAYERS_SUCCESS = 'GAME_EDIT_MIN_PLAYERS_SUCCESS',
    GAME_EDIT_MAX_PLAYERS = 'GAME_EDIT_MAX_PLAYERS',
    GAME_EDIT_MAX_PLAYERS_SUCCESS = 'GAME_EDIT_MAX_PLAYERS_SUCCESS',
    GAME_EDIT_BOX_ART = 'GAME_EDIT_BOX_ART',
    GAME_EDIT_BOX_ART_SUCCESS = 'GAME_EDIT_BOX_ART_SUCCESS',
    GAME_EDIT_BBG_LINK = 'GAME_EDIT_BBG_LINK',
    GAME_EDIT_BBG_LINK_SUCCESS = 'GAME_EDIT_BBG_LINK_SUCCESS',
    GAME_EDIT_PLAY_TIME = 'GAME_EDIT_PLAY_TIME',
    GAME_EDIT_PLAY_TIME_SUCCESS = 'GAME_EDIT_PLAY_TIME_SUCCESS',
    GAME_EDIT_SAVE_NEW = 'GAME_EDIT_SAVE_NEW',
    GAME_EDIT_SAVE_NEW_SUCCESS = 'GAME_EDIT_SAVE_NEW_SUCCESS',
    UPDATE_NAME_NO_SAVE = 'GAME_EDIT_UPDATE_NAME_NO_SAVE',
    UPDATE_MIN_PLAYERS_NO_SAVE = 'GAME_EDIT_UPDATE_MIN_PLAYERS_NO_SAVE',
    UPDATE_MAX_PLAYERS_NO_SAVE = 'GAME_EDIT_UPDATE_MAX_PLAYERS_NO_SAVE',
    UPDATE_BOX_ART_NO_SAVE = 'GAME_EDIT_UPDATE_BOX_ART_NO_SAVE',
    UPDATE_BBG_LINK_NO_SAVE = 'GAME_EDIT_UPDATE_BBG_LINK_NO_SAVE',
    UPDATE_PLAY_TIME_NO_SAVE = 'GAME_EDIT_UPDATE_PLAY_TIME_NO_SAVE'
}

export enum GameMode {
    NEW,
    EDIT
}

export enum LoginActions {
    DO_LOGIN = 'LOGIN_DO_LOGIN',
    DO_LOGIN_SUCCESS = 'LOGIN_DO_LOGIN_SUCCESS',
    DO_LOGOUT = 'LOGIN_DO_LOGOUT',
    DO_LOGOUT_SUCCESS = 'LOGIN_DO_LOGOUT_SUCCESS',
    DO_VALIDATE_LOGIN = 'LOGIN_DO_VALIDATE_LOGIN',
    DO_VALIDATE_LOGIN_SUCCESS = 'LOGIN_DO_VALIDATE_LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED'
}