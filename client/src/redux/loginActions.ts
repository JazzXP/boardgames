import { LoginActions } from './constants';

type LOGIN_ACTION = {
    type:   LoginActions.UPDATE_USERNAME |
            LoginActions.UPDATE_PASSWORD |
            LoginActions.DO_LOGIN |
            LoginActions.DO_LOGOUT |
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
        type: LoginActions.UPDATE_PASSWORD,
        password: password
    }
}

export function doLogin(username: string, password: string): LOGIN_ACTION {
    return {
        type: LoginActions.DO_LOGIN,
        payload: {
            request: {
                method: 'post',
                url: `/auth/login`,
                data: {
                    username: username,
                    password: password
                }
            }
        }
    }
}

export function doLogout(): LOGIN_ACTION {
    return {
        type: LoginActions.DO_LOGOUT,
        payload: {
            request: {
                method: 'post',
                url: `/auth/logout`,
                data: {
                }
            }
        }
    }
}