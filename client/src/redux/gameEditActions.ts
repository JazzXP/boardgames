import { List, Map } from 'immutable';
import { GameEdit } from './constants';
import { BOARDGAME, BoardgameServerState } from './state';

type _BOARDGAME_EDIT_ACTION = {
    type:   GameEdit.GAME_EDIT_NAME | 
            GameEdit.GAME_EDIT_MIN_PLAYERS | 
            GameEdit.GAME_EDIT_MAX_PLAYERS |
            GameEdit.GAME_EDIT_BOX_ART |
            GameEdit.GAME_EDIT_BBG_LINK |
            '';
    payload?: any;
}

export type BOARDGAME_SERVER_ACTION = _BOARDGAME_EDIT_ACTION;

export function setGameEditNameAction(name: string): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.GAME_EDIT_NAME,
        //name: name
    }
}

export function setGameMinPlayersAction(name: string, players?: number): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.GAME_EDIT_MIN_PLAYERS,
        payload: {
            request: {
                method: 'post',
                url: `/games/${name}/update`,
                data: {
                    name: name,
                    minPlayers: players
                }
            }
        }
    }
}

export function setGameMaxPlayersAction(name: string, players?: number): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.GAME_EDIT_MAX_PLAYERS,
        payload: {
            request: {
                method: 'post',
                url: `/games/${name}`,
                data: {
                    name: name,
                    maxPlayers: players 
                }
            }
        }
    }
}

export function setGameBoxArtAction(name: string, link?: string): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.GAME_EDIT_BOX_ART,
        payload: {
            request: {
                method: 'post',
                url: `/games/${name}`,
                data: {
                    name: name,
                    boxArt: link 
                }
            }
        }
    }
}

export function setGameBBGLinkAction(name: string, link?: string): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.GAME_EDIT_BBG_LINK,
        payload: {
            request: {
                method: 'post',
                url: `/games/${name}`,
                data: {
                    name: name,
                    boardgameGeekLink: link 
                }
            }
        }
    }
}