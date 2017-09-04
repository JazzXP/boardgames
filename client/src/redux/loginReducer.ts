import { LoginActions } from './constants';
import { List, fromJS } from 'immutable';
import { 
    LoginDoLoginActionSuccess,
    LoginDoLogoutActionSuccess
} from './loginActionTypes'
import { LoginState } from './loginState';

type AllLoginActions = LoginDoLoginActionSuccess | LoginDoLogoutActionSuccess;

export default function loginReducer(state: boolean = false, action: AllLoginActions): boolean {
    return (action && action.payload && action.payload.data && action.payload.data.loggedIn !== undefined) ? action.payload.data.loggedIn : state;
}
