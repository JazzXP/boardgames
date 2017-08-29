import * as React from 'react';
import { BOARDGAME, BoardgameServerState, BOARDGAME_SERVER_STATE } from '../redux/state';

export interface EditButtonProps {
    labelEdit: string,
    labelDone: string,
    editMode: boolean,
    game: BOARDGAME,
    clickAction?: (edit: boolean, game: BOARDGAME) => void
}

export class EditButton extends React.Component<EditButtonProps, {}> {
    render() {
        return <div><button onClick={ () => { if (this.props.clickAction) { this.props.clickAction(!this.props.editMode, this.props.game); } }}>{this.props.editMode ? this.props.labelDone : this.props.labelEdit}</button><br /></div>;
    }
}
