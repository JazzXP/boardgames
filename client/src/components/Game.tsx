import { setEditModeAction, BOARDGAME_SERVER_ACTION } from '../redux/actions';
import { 
    setGameMinPlayersAction, 
    setGameMaxPlayersAction, 
    setGameBoxArtAction, 
    setGameBBGLinkAction ,
    saveNewGame,
    updateNameNoSave,
    updateMinPlayersNoSave,
    updateMaxPlayersNoSave,
    updateBoxArtNoSave,
    updateBoardgameGeekLinkNoSave
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
import { GameMode } from '../redux/constants';


export interface GameProps {
    name: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string,
    editMode: boolean,
    game?: BoardgameServerState,
    gameMode?: GameMode
}

export interface GamesConnectedDispatch {
    editClickAction?: (edit: boolean, game: BOARDGAME) => void;
    updateNameAction?: (e: React.SyntheticEvent<HTMLFormElement>) => void;
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
        let game: BOARDGAME = {
            name: this.props.name,
            minPlayers: this.props.minPlayers,
            maxPlayers: this.props.maxPlayers,
            boxArt: this.props.boxArt,
            boardgameGeekLink: this.props.boardgameGeekLink
        }
        return <div className="game">
            <DisplayField label="Name:" fieldVal={this.props.name} editMode={this.props.editMode && this.props.gameMode==GameMode.NEW} onBlur={this.props.updateNameAction} /><br />
            <DisplayField label="Min Players:" fieldVal={'' + this.props.minPlayers} editMode={this.props.editMode} onBlur={this.props.updateMinPlayersAction} /><br />
            <DisplayField label="Max Players:" fieldVal={'' + this.props.maxPlayers} editMode={this.props.editMode} onBlur={this.props.updateMaxPlayersAction} /><br />
            <DisplayImageField label="Box Art:" imageURL={this.props.boxArt} editMode={this.props.editMode} onBlur={this.props.updateBoxArtAction} /><br />
            <DisplayURLField label="Boardgame Geek Link:" url={this.props.boardgameGeekLink} editMode={this.props.editMode} onBlur={this.props.updateBBGLinkAction} /><br />
            <button onClick={ () => { if (this.props.editClickAction) { this.props.editClickAction(!this.props.editMode, game); } }}>{this.props.editMode ? "Done" : "Edit"}</button><br />
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
        editMode: state ? state.get('editMode') : false,
        gameMode: ownProps.gameMode
    } 
    return gameProps;
}

function mapDispatchToProps(dispatch: Dispatch<BOARDGAME_SERVER_ACTION | BOARDGAME>, ownProps: GameProps): GamesConnectedDispatch {
    return {
        editClickAction: (edit: boolean, game: BOARDGAME) => {
            if (ownProps.gameMode == GameMode.EDIT) {
                dispatch(setEditModeAction(edit));
            }
            else {
                dispatch(saveNewGame(game))
            }
        },
        updateNameAction: (e: React.SyntheticEvent<HTMLFormElement>): void => {
            if (ownProps.gameMode == GameMode.NEW) {
                dispatch(updateNameNoSave(e.currentTarget.value));
            }
        },
        updateMinPlayersAction: (e: React.FormEvent<HTMLInputElement>): void => {
            if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                const game = ownProps.game as BoardgameServerState;
                dispatch(setGameMinPlayersAction(game.get('name'), parseInt(e.currentTarget.value)));
            }
            else {
                dispatch(updateMinPlayersNoSave(parseInt(e.currentTarget.value)));
            }
        },
        updateMaxPlayersAction: (e: React.FormEvent<HTMLInputElement>): void => {
            if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                const game = ownProps.game as BoardgameServerState;
                dispatch(setGameMaxPlayersAction(game.get('name'), parseInt(e.currentTarget.value)));
            }
            else {
                if (e.currentTarget.value.length > 0) {
                    dispatch(updateMaxPlayersNoSave(parseInt(e.currentTarget.value)));
                }
                else {
                    dispatch(updateMaxPlayersNoSave(undefined));
                }
            }
        },
        updateBoxArtAction: (e: React.FormEvent<HTMLInputElement>): void => {
            if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                const game = ownProps.game as BoardgameServerState;
                dispatch(setGameBoxArtAction(game.get('name'), e.currentTarget.value));
            }
            else {
                if (e.currentTarget.value.length > 0) {
                    dispatch(updateBoxArtNoSave(e.currentTarget.value));
                }
                else {
                    dispatch(updateBoxArtNoSave(undefined));
                }
            }
        },
        updateBBGLinkAction: (e: React.FormEvent<HTMLInputElement>): void => {
            if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                const game = ownProps.game as BoardgameServerState;
                dispatch(setGameBBGLinkAction(game.get('name'), e.currentTarget.value));
            }
            else {
                if (e.currentTarget.value.length > 0) {
                    dispatch(updateBoardgameGeekLinkNoSave(e.currentTarget.value));
                }
                else {
                    dispatch(updateBoardgameGeekLinkNoSave(undefined));
                }
            }
        }
    }
}

export const GameContainer = connect<any, any, GameProps>(
    mapStateToProps,
    mapDispatchToProps
)(Game)