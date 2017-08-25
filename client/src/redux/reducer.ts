import {
    FetchGameAction,
    SET_EDIT_MODE,
    SET_BOARDGAME_STATE,
    GameEdit
} from './constants';
import {
    FetchGame,
    FetchGamesSuccess,
    FetchGameSuccess,
    SetEditMode,
    SetBoardGameState
} from './action_types';

import { 
    GameEditMinPlayersActionSuccess,
    GameEditMaxPlayersActionSuccess,
    GameEditBoxArtActionSuccess,
    GameEditBBGLinkActionSuccess,
    GameEditSaveNewActionSuccess,
    UpdateNameNoSave,
    UpdateMinPlayersNoSave,
    UpdateMaxPlayersNoSave,
    UpdateBoxArtNoSave,
    UpdateBoardgameGeekLinkNoSave
 } from './gameEditActionTypes'

import { List, fromJS } from 'immutable';
import { BoardgameServerState, INITIAL_STATE, BOARDGAME } from './state';

type AllActions =   FetchGameSuccess | 
                    FetchGamesSuccess | 
                    SetEditMode | 
                    SetBoardGameState |
                    GameEditMinPlayersActionSuccess | 
                    GameEditMaxPlayersActionSuccess | 
                    GameEditBoxArtActionSuccess | 
                    GameEditBBGLinkActionSuccess |
                    GameEditSaveNewActionSuccess |
                    UpdateNameNoSave |
                    UpdateMinPlayersNoSave |
                    UpdateMaxPlayersNoSave |
                    UpdateBoxArtNoSave |
                    UpdateBoardgameGeekLinkNoSave;

export function setEntries(state: BoardgameServerState, entries: List<BOARDGAME> | Array<BOARDGAME>): BoardgameServerState {
    return state.set('games', List(entries))
}

export function addEntry(state: BoardgameServerState, entry: BOARDGAME): BoardgameServerState {
    return state.update('games', (games: List<BOARDGAME>) => games.push(entry));
}

export function serverSetList(state: BoardgameServerState, entries: List<BOARDGAME>): BoardgameServerState {
    return state.set('games', entries);
}

export function fetchGame(state: BoardgameServerState, game: string): BoardgameServerState {
    return state.merge({
        game: game, 
        isFetching: true
    });
}

function fetchGamesSuccess(state: BoardgameServerState, games: Array<string>) {
    let gamesList: List<BOARDGAME> = List( games.map((game) => {
        return {
            name: game
        } as BOARDGAME;
    }));
    return state.merge({
        games: gamesList
    });
}

function fetchGameSuccess(state: BoardgameServerState, game: BOARDGAME) {
    return state.merge({
        game: game
    });
}

export default function reducer(state: BoardgameServerState = INITIAL_STATE, action: AllActions): BoardgameServerState {
    let newState: BoardgameServerState = fromJS(state);
    switch (action.type) {
        case FetchGameAction.FETCH_GAMES_SUCCESS:
            return fetchGamesSuccess(newState, action.payload.data.games)
        case FetchGameAction.FETCH_GAME_SUCCESS:
            return fetchGameSuccess(newState, action.payload.data.game)
        case SET_EDIT_MODE:
            return newState.set('editMode', action.editMode);
        case SET_BOARDGAME_STATE:
            return newState.merge({game: action.game});
        case GameEdit.GAME_EDIT_MIN_PLAYERS_SUCCESS:
            return newState.merge({game: action.payload.data.game});
        case GameEdit.GAME_EDIT_MAX_PLAYERS_SUCCESS:
            return newState.merge({game: action.payload.data.game});
        case GameEdit.GAME_EDIT_BOX_ART_SUCCESS:
            return newState.merge({game: action.payload.data.game});
        case GameEdit.GAME_EDIT_BBG_LINK_SUCCESS:
            return newState.merge({game: action.payload.data.game});
        case GameEdit.GAME_EDIT_SAVE_NEW_SUCCESS:
            return newState.merge({game: action.payload.data.game});
        case GameEdit.UPDATE_NAME_NO_SAVE:
        {
            const game = newState.get('game');
            const newGame = game.merge({name: action.name});
            return newState.merge({game:newGame});
        }
        case GameEdit.UPDATE_MIN_PLAYERS_NO_SAVE:
        {
            const game = newState.get('game');
            const newGame = game.merge({minPlayers: action.minPlayers});
            return newState.merge({game:newGame});
        }
        case GameEdit.UPDATE_MAX_PLAYERS_NO_SAVE:
        {
            const game = newState.get('game');
            const newGame = game.merge({maxPlayers: action.maxPlayers});
            return newState.merge({game:newGame});
        }
        case GameEdit.UPDATE_BOX_ART_NO_SAVE:
        {
            const game = newState.get('game');
            const newGame = game.merge({boxArt: action.boxArt});
            return newState.merge({game:newGame});
        }
        case GameEdit.UPDATE_BBG_LINK_NO_SAVE:
        {
            const game = newState.get('game');
            const newGame = game.merge({boardgameGeekLink: action.boardgameGeekLink});
            return newState.merge({game:newGame});
        }
    }
    return newState;
}