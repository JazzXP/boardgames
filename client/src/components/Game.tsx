import * as React from 'react';
import { List } from 'immutable';
import { BoardgameServerState } from '../../../server/src/state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BOARDGAME } from '../redux/state';

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
export class Game extends React.Component<GameProps, GameState> {
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
        </div>;
    }
}


function mapStateToProps(state: BoardgameServerState, ownProps: GameProps): GameProps {
    return {
        name: state.get('game').name,
        minPlayers: state.get('game').minPlayers,
        maxPlayers: state.get('game').maxPlayers,
        boxArt: state.get('game').boxArt,
        boardgameGeekLink: state.get('game').boardgameGeekLink
    }
}

//function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION>): 

export const GameContainer = connect<any, any, GameProps>(
    mapStateToProps,
    {}
)(Game)