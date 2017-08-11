import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { BOARDGAME, BoardgameServerState } from '../redux/state';


export interface GameProps {
    name: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string
}

export interface GameState {}

const defaultName = 'Loading...';
const defaultMinPlayers = 0;
const defaultMaxPlayers = undefined;
const defaultBoxArt = undefined;
const defaultBoardgameGeekLink = undefined;
export class Game extends React.PureComponent<GameProps, GameState> {
    getName(): JSX.Element {
        return <span><span>Name:</span><span>{this.props.name}</span></span>;
    }

    getMinPlayers(): JSX.Element {
        return <span><span>Min Players:</span><span>{this.props.minPlayers}</span></span>;
    }

    getMaxPlayers(): JSX.Element {
        return <span><span>Max Players:</span> 
        { this.props.maxPlayers ? 
            <span>{this.props.maxPlayers}</span> : 
            <span>0</span> }
        </span>;
    }

    getBoxArt(): JSX.Element {
        return this.props.boxArt ? <span><span>Box Art:</span><img src="{this.props.boxArt}" /></span> : <span />;
    }

    getBoardgameGeekLink(): JSX.Element{
        return this.props.boardgameGeekLink ? <span><span>Boadgame Geek:</span><a href="{this.props.boardgameGeekLink}">{this.props.boardgameGeekLink}</a></span> : <span />;
    }

    render() {
        return <div className="game">
            { this.getName() }<br />
            { this.getMinPlayers() }<br />
            { this.getMaxPlayers() }<br />
            { this.getBoxArt() }<br />
            { this.getBoardgameGeekLink() }<br />
            <Link to="/">Back to Main</Link>
        </div>;
    }
}


function mapStateToProps(state: BoardgameServerState, ownProps: GameProps): GameProps {
    const game: any = state.get('game');
    const gameProps: GameProps = {
        name: game ? game.get('name') : defaultName,
        minPlayers: game ? game.get('minPlayers') : 0,
        maxPlayers: game ? game.get('maxPlayers') : undefined,
        boxArt: game ? game.get('boxArt') : undefined,
        boardgameGeekLink: game ? game.get('boardgameGeekLink') : undefined
    } 
    return gameProps;
}

//function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>): 

export const GameContainer = connect<any, any, GameProps>(
    mapStateToProps,
    {}
)(Game)