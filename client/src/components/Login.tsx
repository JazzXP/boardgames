import * as styles from '../styles/Login.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BoardgameServerState } from '../redux/state';
import { BOARDGAME_SERVER_ACTION } from '../redux/actions';
import { updateLoginUsernameAction, updateLoginPasswordAction, doLogin, doLogout } from '../redux/loginActions';

export interface LoginProps {
    username?: string,
    password?: string,
    loggedIn?: boolean
}

export interface LoginConnectedDispatch {
    updateUsernameAction: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    updatePasswordAction: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    loginClickAction: (username: string, password: string) => void;
    logoutClickAction: () => void;
}

export interface LoginState {}

export class Login extends React.Component<LoginProps & LoginConnectedDispatch, LoginState> {
    render() {
        return !this.props.loggedIn ?
        <div className={styles.login}>
            <label>Username:</label><input onChange={this.props.updateUsernameAction} /><br />
            <label>Password:</label><input type="password" onChange={this.props.updatePasswordAction} /><br />
            <button onClick={()=>{this.props.loginClickAction(this.props.username!, this.props.password!)}}>Login</button>
        </div> :
        <div>
            <button onClick={()=>{this.props.logoutClickAction()}}>Logout</button>
        </div>;
    }
}

function mapStateToProps(state: BoardgameServerState, ownProps: LoginProps): LoginProps {
    return {
        username: state.get('username'),
        password: state.get('password'),
        loggedIn: state.get('loggedIn')
    }
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>, ownProps: LoginProps): LoginConnectedDispatch {
    return {
        updateUsernameAction: (e: React.SyntheticEvent<HTMLInputElement>): void => {
            dispatch(updateLoginUsernameAction(e.currentTarget.value));
        },
        updatePasswordAction: (e: React.SyntheticEvent<HTMLInputElement>): void => {
            dispatch(updateLoginPasswordAction(e.currentTarget.value));
        },
        loginClickAction: (username: string, password: string): void => {
            dispatch(doLogin(username, password));
        },
        logoutClickAction: (): void => {
            dispatch(doLogout());
        }
    } 
}

export const LoginContainer = connect<any, any, LoginProps>(
    mapStateToProps,
    mapDispatchToProps
)(Login)