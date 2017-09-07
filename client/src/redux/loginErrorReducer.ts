import { LoginActions } from './constants';
import { List, fromJS } from 'immutable';
import { 
    LoginDoLoginActionSuccess
} from './loginActionTypes'
import { LoginState } from './loginState';

type AllLoginActions = LoginDoLoginActionSuccess;

export default function loginErrorReducer(state: Array<string> = [], action: AllLoginActions): Array<string> {
    if (action && action.payload && action.payload.data && action.payload.data.loggedIn) return [];
    return (action && action.payload && action.payload.data && action.payload.data.error !== undefined) ? action.payload.data.error : state;
}
