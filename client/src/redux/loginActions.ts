import { LoginActions } from './constants';

type LOGIN_ACTION = {
    type:   LoginActions.UPDATE_USERNAME |
            LoginActions.UPDATE_PASSWORD |
            LoginActions.DO_LOGIN |
            '';
    username?: string;
    password?: string;
    payload?: any;
}

export function updateLoginUsernameAction(username: string): LOGIN_ACTION {
    return {
        type: LoginActions.UPDATE_USERNAME,
        username: username
    }
}

export function updateLoginPasswordAction(password: string): LOGIN_ACTION {
    return {
        type: LoginActions.UPDATE_USERNAME,
        password: password
    }
}

export function doLogin(username: string, password: string): LOGIN_ACTION {
    return {
        type: LoginActions.DO_LOGIN,
        payload: {
            request: {
                method: 'post',
                url: `/games/login`,
                data: {
                    username: username,
                    password: password
                }
            }
        }
    }
}