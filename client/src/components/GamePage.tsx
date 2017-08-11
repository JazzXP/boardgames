import { BOARDGAME, BoardgameServerState } from '../redux/state';
import * as React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BOARDGAME_SERVER_ACTION, fetchGame } from '../redux/actions';

import { Game } from './Game';

interface GameConnectedDispatch {
    loadGame?: (game: string) => void;
}


export interface GameState {}

export class GamePage extends React.Component<BOARDGAME & GameConnectedDispatch, GameState> {

    componentDidMount() {
        if (this.props.loadGame)
            this.props.loadGame(this.props.name);
    }

    render(): JSX.Element {
        return this.props ? <Game  {...this.props } /> : <span>Loading...</span>;
    }
}

function mapStateToProps(state: BoardgameServerState, ownProps: BOARDGAME) {
    return {
        games: state.get('games').map((game: BOARDGAME) => { return game.name })
    }
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>): GameConnectedDispatch {
    return {
        loadGame: (game: string) => {
            dispatch(fetchGame(game));
        }
    }
}

export const GamesListContainer = connect<any, any, BOARDGAME>(
    mapStateToProps,
    mapDispatchToProps
)(Game)