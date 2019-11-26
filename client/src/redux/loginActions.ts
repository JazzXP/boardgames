import { LoginActions } from './constants';

type LOGIN_ACTION = {
    type:   LoginActions.DO_LOGIN |
            LoginActions.DO_LOGOUT |
            LoginActions.DO_VALIDATE_LOGIN |
            '';
    username?: string;
    password?: string;
    payload?: any;
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

export function doValidateLogin(): LOGIN_ACTION {
    return {
        type: LoginActions.DO_VALIDATE_LOGIN,
        payload: {
            request: {
                method: 'get',
                url: `/auth/`,
                data: {
                }
            }
        }
    }
}