import { BOARDGAME } from './state';
import { GameEdit } from './constants';
import { List } from 'immutable';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type GameEditNameAction = {
    type: GameEdit.GAME_EDIT_NAME,
    name: string
}

export type GameEditMinPlayersAction = {
    type: GameEdit.GAME_EDIT_MIN_PLAYERS,
    minPlayers: number
}

export type GameEditMinPlayersActionSuccess = {
    type: GameEdit.GAME_EDIT_MIN_PLAYERS_SUCCESS,
    payload: AxiosResponse
}

export type GameEditMaxPlayersAction = {
    type: GameEdit.GAME_EDIT_MAX_PLAYERS,
    maxPlayers: number
}

export type GameEditMaxPlayersActionSuccess = {
    type: GameEdit.GAME_EDIT_MAX_PLAYERS_SUCCESS,
    payload: AxiosResponse
}

export type GameEditBoxArtAction = {
    type: GameEdit.GAME_EDIT_BOX_ART,
    boxArt: string
}

export type GameEditBoxArtActionSuccess = {
    type: GameEdit.GAME_EDIT_BOX_ART_SUCCESS,
    payload: AxiosResponse
}

export type GameEditBBGLinkAction = {
    type: GameEdit.GAME_EDIT_BBG_LINK,
    boardgameGeekLink: string
}

export type GameEditBBGLinkActionSuccess = {
    type: GameEdit.GAME_EDIT_BBG_LINK_SUCCESS,
    payload: AxiosResponse
}
