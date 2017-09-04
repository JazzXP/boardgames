import { BOARDGAME } from './state';
import { LoginActions } from './constants';
import { AxiosResponse } from 'axios';

export type LoginDoLoginAction = {
    type: LoginActions.DO_LOGIN,
    username: string,
    password: string
}

export type LoginDoLoginActionSuccess = {
    type: LoginActions.DO_LOGIN_SUCCESS,
    payload: AxiosResponse
}

export type LoginDoLogoutActionSuccess = {
    type: LoginActions.DO_LOGOUT_SUCCESS,
    payload: AxiosResponse
}