import * as React from 'react';

export interface MenuLoginProps {
    alignment: string
}

export interface MenuLoginState {
    visible: boolean
}

export class MenuLogin extends React.PureComponent<MenuLoginProps, MenuLoginState> {
    constructor(props: any) {
        super(props);
        this.state = {visible: false};
    }

    show() {
        this.setState({visible: true});
    }

    hide() {
        this.setState({visible: false});
    }

    render() {
        return <div className="menuLogin">
            <div className={(this.state.visible ? "visible " : "invisible ") + this.props.alignment}>
                {this.props.children}
                <button onClick={() => this.hide()}>Hide</button>
            </div>
        </div>
    }
}