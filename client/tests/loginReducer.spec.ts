import loginReducer from '../src/redux/loginReducer';
import { LoginActions } from '../src/redux/constants'
import { 
    LoginDoLoginActionSuccess,
    LoginDoLogoutActionSuccess
} from '../src/redux/loginActionTypes'

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests the login reducer')
class TestLoginReducer {
    @test('Reducer sets loggedIn to true')
    testReducerSetsLoggedInTrue() {
        const initialState = false;
        const action = {
            type: LoginActions.DO_LOGIN_SUCCESS, 
            payload: { 
                data: { 
                    loggedIn: true
                } 
            }
        } as LoginDoLoginActionSuccess;
        const newState = loginReducer(initialState, action);
        expect(newState).to.be.true;
    }

    @test('Reducer sets loggedIn to false')
    testReducerSetsEditModeFalse() {
        const initialState = false;
        const action = {
            type: LoginActions.DO_LOGIN_SUCCESS, 
            payload: { 
                data: { 
                    loggedIn: false
                } 
            }
        } as LoginDoLoginActionSuccess;
        const newState = loginReducer(initialState, action);
        expect(newState).to.be.false;
    }

    @test('Reducer sets loggedIn to true when state is true')
    testReducerSetsLoggedInTrueWhenStateIsTrue() {
        const initialState = true;
        const action = {
            type: LoginActions.DO_LOGOUT_SUCCESS, 
            payload: { 
                data: { 
                    loggedIn: true
                } 
            }
        } as LoginDoLogoutActionSuccess;
        const newState = loginReducer(initialState, action);
        expect(newState).to.be.true;
    }

    @test('Reducer sets loggedIn to false when initial state is true')
    testReducerSetsEditModeFalseWhenStateIsTrue() {
        const initialState = true;
        const action = {
            type: LoginActions.DO_LOGOUT_SUCCESS, 
            payload: { 
                data: { 
                    loggedIn: false
                } 
            }
        } as LoginDoLogoutActionSuccess;
        const newState = loginReducer(initialState, action);
        expect(newState).to.be.false;
    }

    @test('Reducer passes through state when loggedIn undefined')
    testReducerSetPassesStateWhenUndefined() {
        const initialState = true;
        const hackedReducer: (state: any, action: any)=>boolean = loginReducer;
        const newState = hackedReducer(initialState, {type: LoginActions.DO_LOGIN_SUCCESS, payload: { data: { loggedIn: undefined}}});
        expect(newState).to.be.true;
    }

    @test('Reducer with undefined state')
    testReducerWithUndefinedState() {
        const action = {
            type: LoginActions.DO_LOGIN_SUCCESS, 
            payload: { 
                data: { 
                    loggedIn: true
                } 
            }
        } as LoginDoLoginActionSuccess;
        const newState = loginReducer(undefined, action);
        expect(newState).to.be.true;
    }
}