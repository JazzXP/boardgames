import { List, Map } from 'immutable';
import { GameEdit } from './constants';
import { BOARDGAME, BoardgameServerState } from './state';

type _BOARDGAME_EDIT_ACTION = {
    type: GameEdit.GAME_EDIT_NAME | '';
}

export type BOARDGAME_SERVER_ACTION = _BOARDGAME_EDIT_ACTION & BOARDGAME;

export function setGameEditNameAction(name: string): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.GAME_EDIT_NAME,
        name: name
    }
}