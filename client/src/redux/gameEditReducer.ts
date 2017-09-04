import { GameEdit, FetchGameAction } from './constants';
import { List, Map } from 'immutable';
import { BoardgameServerState, INITIAL_STATE, Boardgame } from './state';
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
import {
    FetchGameSuccess,
} from './action_types';

 type AllGameEditActions = 
    GameEditMinPlayersActionSuccess | 
    GameEditMaxPlayersActionSuccess | 
    GameEditBoxArtActionSuccess | 
    GameEditBBGLinkActionSuccess |
    GameEditSaveNewActionSuccess |
    UpdateNameNoSave |
    UpdateMinPlayersNoSave |
    UpdateMaxPlayersNoSave |
    UpdateBoxArtNoSave |
    UpdateBoardgameGeekLinkNoSave |
    FetchGameSuccess;

export default function gameEditReducer(state: Boardgame = new Boardgame(), action: AllGameEditActions): Boardgame {
    switch(action.type) {
        case GameEdit.GAME_EDIT_MIN_PLAYERS_SUCCESS:
        case GameEdit.GAME_EDIT_MAX_PLAYERS_SUCCESS:
        case GameEdit.GAME_EDIT_BOX_ART_SUCCESS:
        case GameEdit.GAME_EDIT_BBG_LINK_SUCCESS:
        case GameEdit.GAME_EDIT_SAVE_NEW_SUCCESS:
        case FetchGameAction.FETCH_GAME_SUCCESS:
            return state.merge(action.payload.data.game);
        case GameEdit.UPDATE_NAME_NO_SAVE:
            return state.merge({name: action.name});
        case GameEdit.UPDATE_MIN_PLAYERS_NO_SAVE:
            return state.merge({minPlayers: action.minPlayers});
        case GameEdit.UPDATE_MAX_PLAYERS_NO_SAVE:
            return state.merge({maxPlayers: action.maxPlayers});
        case GameEdit.UPDATE_BOX_ART_NO_SAVE:
            return state.merge({boxArt: action.boxArt});
        case GameEdit.UPDATE_BBG_LINK_NO_SAVE:
            return state.merge({boardgameGeekLink: action.boardgameGeekLink});
    }
    return state;
}
