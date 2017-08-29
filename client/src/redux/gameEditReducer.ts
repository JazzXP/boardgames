import { GameEdit } from './constants';
import { List, fromJS } from 'immutable';
import { BoardgameServerState, INITIAL_STATE, BOARDGAME } from './state';
import { 
    GameEditMinPlayersAction,
    GameEditMaxPlayersAction,
    GameEditBoxArtAction,
    GameEditBBGLinkAction
 } from './gameEditActionTypes'

 type AllGameEditActions = GameEditMinPlayersAction | GameEditMaxPlayersAction | GameEditBoxArtAction | GameEditBBGLinkAction

// export default function gameEditReducer(state: BoardgameServerState = INITIAL_STATE, action: AllGameEditActions): BoardgameServerState {
//     let newState: BoardgameServerState = fromJS(state);
//     switch(action.type) {
//     }
//     return newState;
// }
    