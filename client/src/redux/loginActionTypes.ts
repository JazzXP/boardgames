import { BOARDGAME } from './state';
import { LoginActions } from './constants';
import { AxiosResponse } from 'axios';

export type LoginUpdateUsernameAction = {
    type: LoginActions.UPDATE_USERNAME,
    username: string
}

export type LoginUpdatePasswordAction = {
    type: LoginActions.UPDATE_PASSWORD,
    password: string
}

export type LoginDoLoginAction = {
    type: LoginActions.DO_LOGIN,
    username: string,
    password: string
}

export type LoginDoLoginActionSuccess = {
    type: LoginActions.DO_LOGIN_SUCCESS,
    payload: AxiosResponse
}