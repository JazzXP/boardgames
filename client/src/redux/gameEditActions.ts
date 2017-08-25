import { List, Map } from 'immutable';
import { GameEdit } from './constants';
import { BOARDGAME_NO_NAME, BoardgameServerState } from './state';

type _BOARDGAME_EDIT_ACTION = {
    type:   GameEdit.GAME_EDIT_MIN_PLAYERS | 
            GameEdit.GAME_EDIT_MAX_PLAYERS |
            GameEdit.GAME_EDIT_BOX_ART |
            GameEdit.GAME_EDIT_BBG_LINK |
            GameEdit.GAME_EDIT_SAVE_NEW |
            GameEdit.UPDATE_NAME_NO_SAVE |
            GameEdit.UPDATE_MIN_PLAYERS_NO_SAVE |
            GameEdit.UPDATE_MAX_PLAYERS_NO_SAVE |
            GameEdit.UPDATE_BOX_ART_NO_SAVE |
            GameEdit.UPDATE_BBG_LINK_NO_SAVE |
            '';
    payload?: any;
}

export type BOARDGAME_SERVER_ACTION = _BOARDGAME_EDIT_ACTION & BOARDGAME_NO_NAME;

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
                url: `/games/${name}/update`,
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
                url: `/games/${name}/update`,
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
                url: `/games/${name}/update`,
                data: {
                    name: name,
                    boardgameGeekLink: link 
                }
            }
        }
    }
}

export function saveNewGame(game: BOARDGAME_NO_NAME): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.GAME_EDIT_SAVE_NEW,
        payload: {
            request: {
                method: 'post',
                url: `/games/${game.name}/add`,
                data: game
            }
        }
    }
}

export function updateNameNoSave(name: string): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.UPDATE_NAME_NO_SAVE,
        name: name
    }
}

export function updateMinPlayersNoSave(minPlayers: number): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.UPDATE_MIN_PLAYERS_NO_SAVE,
        minPlayers: minPlayers
    }
}

export function updateMaxPlayersNoSave(maxPlayers: number | undefined): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.UPDATE_MAX_PLAYERS_NO_SAVE,
        maxPlayers: maxPlayers
    }
}

export function updateBoxArtNoSave(boxArt: string | undefined): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.UPDATE_BOX_ART_NO_SAVE,
        boxArt: boxArt
    }
}

export function updateBoardgameGeekLinkNoSave(boardgameGeekLink: string | undefined): BOARDGAME_SERVER_ACTION {
    return {
        type: GameEdit.UPDATE_BBG_LINK_NO_SAVE,
        boardgameGeekLink: boardgameGeekLink
    }
}