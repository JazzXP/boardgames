import * as styles from '../styles/Login.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BoardgameServerState } from '../redux/state';
import { BOARDGAME_SERVER_ACTION } from '../redux/actions';
import { doLogin, doLogout } from '../redux/loginActions';

export interface LoginProps {
    loggedIn?: boolean
    loginErrorMessages?: Array<string>
}

export interface LoginConnectedDispatch {
    loginClickAction?: (username: string, password: string) => void;
    logoutClickAction?: () => void;
}

export interface LoginState {
    username: string,
    password: string,
}

export class Login extends React.Component<LoginProps & LoginConnectedDispatch, LoginState> {
    componentWillMount() {
        // clear out when we show
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        const errors = (this.props.loginErrorMessages && this.props.loginErrorMessages.length > 0 ) ? this.props.loginErrorMessages.map((message) => <li key={message.replace(' ', '')}>{message}</li>) : undefined;
        return !this.props.loggedIn ?
        <div className={styles.login}>
            {errors ? <ul className={styles.error}>{errors}</ul>:''}
            <label>Username:</label><input onChange={(e) => this.setState({username: e.currentTarget.value})} /><br />
            <label>Password:</label><input type="password" onChange={(e) => this.setState({password: e.currentTarget.value})}  /><br />
            <button onClick={()=>{this.props.loginClickAction && this.props.loginClickAction(this.state.username!, this.state.password!)}}>Login</button>
        </div> :
        <div>
            <button onClick={()=>{this.props.logoutClickAction && this.props.logoutClickAction()}}>Logout</button>
        </div>;
    }
}

function mapStateToProps(state: BoardgameServerState, ownProps: LoginProps): LoginProps {
    return {
        loggedIn: state.get('loggedIn'),
        loginErrorMessages: state.get('loginErrorMessages')
    }
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>, ownProps: LoginProps): LoginConnectedDispatch {
    return {
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