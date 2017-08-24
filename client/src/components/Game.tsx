import { setEditModeAction, BOARDGAME_SERVER_ACTION } from '../redux/actions';
import { 
    setGameEditNameAction, 
    setGameMinPlayersAction, 
    setGameMaxPlayersAction, 
    setGameBoxArtAction, 
    setGameBBGLinkAction 
} from '../redux/gameEditActions'
import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { BOARDGAME, BoardgameServerState, BOARDGAME_SERVER_STATE } from '../redux/state';
import { DisplayField } from './DisplayField';
import { DisplayImageField } from './DisplayImageField';
import { DisplayURLField } from './DisplayURLField';
import { GameEditNameAction } from '../redux/gameEditActionTypes';


export interface GameProps {
    name: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string,
    editMode: boolean
    game?: BoardgameServerState;
}

export interface GamesConnectedDispatch {
    editClickAction?: (edit: boolean) => void;
    updateNameAction?: (e: React.FormEvent<HTMLInputElement>) => void;
    updateMinPlayersAction?: (e: React.FormEvent<HTMLInputElement>) => void;
    updateMaxPlayersAction?: (e: React.FormEvent<HTMLInputElement>) => void;
    updateBoxArtAction?: (e: React.FormEvent<HTMLInputElement>) => void;
    updateBBGLinkAction?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface GameState {}

const defaultName = 'Loading...';
const defaultMinPlayers = 0;
const defaultMaxPlayers = undefined;
const defaultBoxArt = undefined;
const defaultBoardgameGeekLink = undefined;
export class Game extends React.Component<GameProps & GamesConnectedDispatch, GameState> {
    render() {
        return <div className="game">
            <DisplayField label="Name:" fieldVal={this.props.name} editMode={this.props.editMode} onBlur={this.props.updateNameAction} /><br />
            <DisplayField label="Min Players:" fieldVal={'' + this.props.minPlayers} editMode={this.props.editMode} onBlur={this.props.updateMinPlayersAction} /><br />
            <DisplayField label="Max Players:" fieldVal={'' + this.props.maxPlayers} editMode={this.props.editMode} onBlur={this.props.updateMaxPlayersAction} /><br />
            <DisplayImageField label="Box Art:" imageURL={this.props.boxArt} editMode={this.props.editMode} onBlur={this.props.updateBoxArtAction} /><br />
            <DisplayURLField label="Boardgame Geek Link:" url={this.props.boardgameGeekLink} editMode={this.props.editMode} onBlur={this.props.updateBBGLinkAction} /><br />
            <button onClick={ () => { if (this.props.editClickAction) { this.props.editClickAction(!this.props.editMode); } }}>{this.props.editMode ? "Done" : "Edit"}</button><br />
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
        boardgameGeekLink: game ? game.get('boardgameGeekLink') : undefined,
        editMode: state ? state.get('editMode') : false
    } 
    return gameProps;
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION | BOARDGAME>, ownProps: GameProps): GamesConnectedDispatch {
    return {
        editClickAction: (edit: boolean) => {
            dispatch(setEditModeAction(edit));
        },
        updateNameAction: (e: React.FormEvent<HTMLInputElement>): void => {
            dispatch(setGameEditNameAction(e.currentTarget.value));
        },
        updateMinPlayersAction: (e: React.FormEvent<HTMLInputElement>): void => {
            if (ownProps && ownProps.game) {
                const game = ownProps.game as BoardgameServerState;
                dispatch(setGameMinPlayersAction(game.get('name'), parseInt(e.currentTarget.value)));
            }            
        },
        updateMaxPlayersAction: (e: React.FormEvent<HTMLInputElement>): void => {
            if (ownProps && ownProps.game) {
                const game = ownProps.game as BoardgameServerState;
                dispatch(setGameMaxPlayersAction(game.get('name'), parseInt(e.currentTarget.value)));
            }
        },
        updateBoxArtAction: (e: React.FormEvent<HTMLInputElement>): void => {
            if (ownProps && ownProps.game) {
                const game = ownProps.game as BoardgameServerState;
                dispatch(setGameBoxArtAction(game.get('name'), e.currentTarget.value));
            }
        },
        updateBBGLinkAction: (e: React.FormEvent<HTMLInputElement>): void => {
            if (ownProps && ownProps.game) {
                const game = ownProps.game as BoardgameServerState;
                dispatch(setGameBBGLinkAction(game.get('name'), e.currentTarget.value));
            }
        }
    }
}

export const GameContainer = connect<any, any, GameProps>(
    mapStateToProps,
    mapDispatchToProps
)(Game)