import { GameEdit } from './constants';
import { List, fromJS } from 'immutable';
import { BoardgameServerState, INITIAL_STATE, BOARDGAME } from './state';
import { 
    GameEditNameAction,
    GameEditMinPlayersAction,
    GameEditMaxPlayersAction,
    GameEditBoxArtAction,
    GameEditBBGLinkAction
 } from './gameEditActionTypes'

 type AllGameEditActions = GameEditNameAction | GameEditMinPlayersAction | GameEditMaxPlayersAction | GameEditBoxArtAction | GameEditBBGLinkAction

export default function gameEditReducer(state: BoardgameServerState = INITIAL_STATE, action: AllGameEditActions): BoardgameServerState {
    let newState: BoardgameServerState = fromJS(state);
    switch(action.type) {
        case GameEdit.GAME_EDIT_NAME:
            return newState.set('name', action.name);
    }
    return newState;
}
    