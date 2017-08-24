import { BOARDGAME, BoardgameServerState, BOARDGAME_SERVER_STATE } from '../redux/state';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BOARDGAME_SERVER_ACTION, setEditModeAction } from '../redux/actions';
import { GameContainer } from './Game';

interface AddGameConnectedDispatch {
    match?: any,
    editAction: (edit: boolean) => void;
}

export interface AddGameState {}

const defaultGame: BOARDGAME_SERVER_STATE = { 
    game: {
        name: "Blah",
        minPlayers: 0,
        maxPlayers: 0,
        boxArt: "",
        boardgameGeekLink: "",
    } as BOARDGAME
}

export class AddGamePage extends React.PureComponent<BOARDGAME & AddGameConnectedDispatch, AddGameState> {
    componentWillMount() {
        this.props.editAction(true);
    }

    render(): JSX.Element {
        let game: BOARDGAME = defaultGame.game as BOARDGAME;
        return <GameContainer editMode={true} name={game.name} game={new BoardgameServerState(defaultGame)} />;
    }
}

function mapStateToProps(state: BoardgameServerState, ownProps: BOARDGAME) {
    return {
        game: state.get('game')
    }
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>): AddGameConnectedDispatch {
    return {
        editAction: (edit: boolean) => {
            dispatch(setEditModeAction(edit));
        }
    }
}

export const AddGamePageContainer = connect<any, any, BOARDGAME>(
    mapStateToProps,
    mapDispatchToProps
)(AddGamePage)