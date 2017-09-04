import { BOARDGAME } from './state';
import { GameEdit } from './constants';
import { List } from 'immutable';
import { AxiosResponse } from 'axios';

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

export type GameEditSaveNewActionSuccess = {
    type: GameEdit.GAME_EDIT_SAVE_NEW_SUCCESS,
    payload: AxiosResponse
}

export type UpdateNameNoSave = {
    type: GameEdit.UPDATE_NAME_NO_SAVE,
    name: string
}

export type UpdateMinPlayersNoSave = {
    type: GameEdit.UPDATE_MIN_PLAYERS_NO_SAVE,
    minPlayers: number
}

export type UpdateMaxPlayersNoSave = {
    type: GameEdit.UPDATE_MAX_PLAYERS_NO_SAVE,
    maxPlayers: number | undefined
}

export type UpdateBoxArtNoSave = {
    type: GameEdit.UPDATE_BOX_ART_NO_SAVE,
    boxArt: string | undefined
}

export type UpdateBoardgameGeekLinkNoSave = {
    type: GameEdit.UPDATE_BBG_LINK_NO_SAVE,
    boardgameGeekLink: string | undefined
}