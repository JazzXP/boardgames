import '../styles/MenuBar.scss';
import * as React from 'react';
import { LoginContainer } from './Login';
import { MenuLogin } from './MenuLogin';
export interface MenuBarProps {
    alignment?: string
}

export class MenuBar extends React.PureComponent<MenuBarProps, {}> {
    showLogin() {
        (this.refs.left as any).show();
    }
    render() {
        return <div className="menuBar">
            <MenuLogin ref="left" alignment="left">
                <LoginContainer />
            </MenuLogin>
            <button onClick={(e) => this.showLogin()}>Login</button>
        </div>;
    }
}