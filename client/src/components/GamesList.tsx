import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { BOARDGAME, BoardgameServerState } from '../redux/state';
import { BOARDGAME_SERVER_ACTION, fetchGames } from '../redux/actions';
import { LoginContainer } from './Login';

export interface GamesListProps {
    games: List<string>,
    loggedIn?: boolean
}

export interface GamesListConnectedDispatch {
    gameClickAction?: (entry: string) => void;
    loadGames?: () => void;
}

export interface GamesListState {}

export class GamesList extends React.Component<GamesListProps & GamesListConnectedDispatch, GamesListState> {
    getList(): List<string> {
        return this.props.games;
    }

    componentWillMount() {
        if (this.props.loadGames)
            this.props.loadGames();
    }

    render() {
        return <div className="gamesList">
            <ul>
            {this.getList().map((game: string) => 
                <li key={game}><Link to={`/games/${game}`}>{game}</Link></li>
            )}
            </ul>
            {this.props.loggedIn ? <Link to="/addGame">Add Game</Link> : ""}
        </div>;
    }
}


function mapStateToProps(state: BoardgameServerState, ownProps: GamesListProps) {
    return {
        games: state.get('games').map((game: BOARDGAME) => { return game.name }),
        loggedIn: state.get('loggedIn')
    }
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>): GamesListConnectedDispatch {
    return {
        loadGames: () => {
            dispatch(fetchGames());
        }
    }
}

export const GamesListContainer = connect<any, any, GamesListProps>(
    mapStateToProps,
    mapDispatchToProps
)(GamesList)