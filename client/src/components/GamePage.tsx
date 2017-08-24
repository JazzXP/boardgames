import { BOARDGAME, BoardgameServerState } from '../redux/state';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BOARDGAME_SERVER_ACTION, fetchGame } from '../redux/actions';

import { GameContainer } from './Game';

interface GameConnectedDispatch {
    match?: any,
    loadGame?: (game: string) => void;
}

type EDITMODE = {
    editMode: boolean;
}

export interface GameState {}

export class GamePage extends React.PureComponent<BOARDGAME & GameConnectedDispatch & EDITMODE, GameState> {

    componentDidMount() {
        if (this.props.loadGame) {
            this.props.loadGame(this.props.match.params.name);
        }
    }

    render(): JSX.Element {
        return this.props ? <GameContainer  {...this.props }  /> : <span>Loading...</span>;
    }
}

function mapStateToProps(state: BoardgameServerState, ownProps: BOARDGAME & EDITMODE) {
    return {
        game: state.get('game'),
        editMode: state ? state.get('editMode') : false
    }
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>): GameConnectedDispatch {
    return {
        loadGame: (game: string) => {
            dispatch(fetchGame(game));
        }
    }
}

export const GamePageContainer = connect<any, any, BOARDGAME & EDITMODE>(
    mapStateToProps,
    mapDispatchToProps
)(GamePage)