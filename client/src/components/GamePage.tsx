import { BOARDGAME, BoardgameServerState } from '../redux/state';
import * as React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BOARDGAME_SERVER_ACTION, fetchGame } from '../redux/actions';

import { GameContainer } from './Game';

interface GameConnectedDispatch {
    match?: any,
    loadGame?: (game: string) => void;
}


export interface GameState {}

export class GamePage extends React.PureComponent<BOARDGAME & GameConnectedDispatch, GameState> {

    componentDidMount() {
        if (this.props.loadGame) {
            this.props.loadGame(this.props.match.params.name);
        }
    }

    render(): JSX.Element {
        return this.props ? <GameContainer  {...this.props } /> : <span>Loading...</span>;
    }
}

function mapStateToProps(state: BoardgameServerState, ownProps: BOARDGAME) {
    return {
        game: state.get('game')
    }
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>): GameConnectedDispatch {
    return {
        loadGame: (game: string) => {
            dispatch(fetchGame(game));
        }
    }
}

export const GamePageContainer = connect<any, any, BOARDGAME>(
    mapStateToProps,
    mapDispatchToProps
)(GamePage)