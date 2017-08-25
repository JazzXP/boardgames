import { BOARDGAME, BoardgameServerState, BOARDGAME_SERVER_STATE } from '../redux/state';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BOARDGAME_SERVER_ACTION, setEditModeAction, setBoardgameState } from '../redux/actions';
import { GameContainer } from './Game';
import { GameMode } from '../redux/constants';

interface AddGameConnectedDispatch {
    match?: any,
    editAction: (edit: boolean, game: BOARDGAME) => void;
}

export interface AddGameState {}

const defaultGame: BOARDGAME = { 
    name: "",
    minPlayers: 0,
    maxPlayers: 0,
    boxArt: "",
    boardgameGeekLink: ""
}

export class AddGamePage extends React.PureComponent<BOARDGAME & AddGameConnectedDispatch, AddGameState> {
    componentWillMount() {
        this.props.editAction(true, defaultGame);
    }

    render(): JSX.Element {
        return <GameContainer editMode={true} name="" gameMode={GameMode.NEW} />;
    }
}

function mapStateToProps(state: BoardgameServerState, ownProps: BOARDGAME) {
    return {
        game: state.get('game')
    }
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>): AddGameConnectedDispatch {
    return {
        editAction: (edit: boolean, game: BOARDGAME) => {
            dispatch(setBoardgameState(game));
            dispatch(setEditModeAction(edit));
        }
    }
}

export const AddGamePageContainer = connect<any, any, BOARDGAME>(
    mapStateToProps,
    mapDispatchToProps
)(AddGamePage)