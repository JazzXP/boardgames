import { setEditModeAction, BOARDGAME_SERVER_ACTION } from '../redux/actions';
import { 
    setGameMinPlayersAction, 
    setGameMaxPlayersAction, 
    setGameBoxArtAction, 
    setGameBBGLinkAction,
    setGamePlayTimeAction,
    saveNewGame,
    updateNameNoSave,
    updateMinPlayersNoSave,
    updateMaxPlayersNoSave,
    updateBoxArtNoSave,
    updateBoardgameGeekLinkNoSave,
    updatePlayTimeNoSave
} from '../redux/gameEditActions'
import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { BOARDGAME, BoardgameServerState, BOARDGAME_SERVER_STATE, Boardgame } from '../redux/state';
import { DisplayField } from './DisplayField';
import { DisplayImageField } from './DisplayImageField';
import { DisplayURLField } from './DisplayURLField';
import { EditButton } from './EditButton';
import { GameMode } from '../redux/constants';
import numberValidator from '../validators/numberValidator';
import clearOrNumberValidator from '../validators/clearOrNumberValidator';
import urlValidator from '../validators/urlValidator';
import imageURLValidator from '../validators/imageURLValidator';
import regexValidator from '../validators/regexValidator';


export interface GameProps {
    name: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string,
    playTime?: string,
    editMode: boolean,
    game?: BoardgameServerState,
    gameMode?: GameMode,
    loggedIn?: boolean
}

type ReactEvent = React.SyntheticEvent<HTMLFormElement>;

export interface GamesConnectedDispatch {
    editClickAction?: (edit: boolean, game: BOARDGAME) => void;
    updateNameAction?: (oldval: string | undefined, e: ReactEvent) => void;
    updateMinPlayersAction?: (oldval: number | undefined, e: ReactEvent) => void;
    updateMaxPlayersAction?: (oldval: number | undefined, e: ReactEvent) => void;
    updateBoxArtAction?: (oldval: string | undefined, e: ReactEvent) => void;
    updateBBGLinkAction?: (oldval: string | undefined, e: ReactEvent) => void;
    updatePlayTimeAction?: (oldval: string | undefined, e: ReactEvent) => void;
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
            boardgameGeekLink: this.props.boardgameGeekLink,
            playTime: this.props.playTime
        }

        return <div className="game">
            <DisplayField 
                label="Name:" 
                fieldVal={this.props.name} 
                editMode={this.props.editMode && this.props.gameMode==GameMode.NEW} 
                onBlur={(e: ReactEvent) => this.props.updateNameAction && this.props.updateNameAction(this.props.name, e)} 
            />
            <DisplayField 
                label="Min Players:"
                fieldVal={this.props.minPlayers as any as string}
                editMode={this.props.editMode}
                validator={numberValidator({error:'Must be a number'})}
                onBlur={(e: ReactEvent) => this.props.updateMinPlayersAction && this.props.updateMinPlayersAction(this.props.minPlayers, e)} 
            />
            <DisplayField 
                label="Max Players:"
                fieldVal={this.props.maxPlayers as any as string}
                editMode={this.props.editMode}
                validator={clearOrNumberValidator({error:'Must be a number'})}
                onBlur={(e: ReactEvent) => this.props.updateMaxPlayersAction && this.props.updateMaxPlayersAction(this.props.maxPlayers, e)} 
            />
            <DisplayField 
                label="Play Time:" 
                fieldVal={this.props.playTime as any as string} 
                editMode={this.props.editMode} 
                validator={regexValidator({error:'Format must be #-#min or #-#hours', regex:/^(\d+-\d+(min|hours)|)$/})}
                onBlur={(e: ReactEvent) => this.props.updatePlayTimeAction && this.props.updatePlayTimeAction(this.props.playTime, e)} 
            />
            <DisplayImageField 
                label="Box Art:" 
                imageURL={this.props.boxArt} 
                editMode={this.props.editMode} 
                validator={urlValidator({error:'Must be a valid URL'})} 
                onBlur={(e: React.SyntheticEvent<HTMLFormElement>) => this.props.updateBoxArtAction && this.props.updateBoxArtAction(this.props.boxArt, e)} 
            />
            <DisplayURLField 
                label="Boardgame Geek Link:" 
                url={this.props.boardgameGeekLink} 
                editMode={this.props.editMode} 
                validator={imageURLValidator({error:'Must be a valid image link'})} 
                onBlur={(e: ReactEvent) => this.props.updateBBGLinkAction && this.props.updateBBGLinkAction(this.props.boardgameGeekLink, e)} 
            />
            {this.props.loggedIn ? <EditButton editMode={this.props.editMode} clickAction={this.props.editClickAction} labelDone="Done" labelEdit="Edit" game={game} /> : "" }
            <Link to="/">Back to Main</Link>
        </div>;
    }
}

function mapStateToProps(state: BoardgameServerState, ownProps: GameProps): GameProps {
    const game: Boardgame = state.get('game');
    const gameProps: GameProps = {
        name: game ? game.get('name') : defaultName,
        minPlayers: game ? game.get('minPlayers') : 0,
        maxPlayers: game ? game.get('maxPlayers') : undefined,
        playTime: game ? game.get('playTime') : undefined,
        boxArt: game ? game.get('boxArt') : undefined,
        boardgameGeekLink: game ? game.get('boardgameGeekLink') : undefined,
        editMode: state.get('editMode'),
        gameMode: ownProps.gameMode,
        loggedIn: state.get('loggedIn')
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
        updateNameAction: (oldval: string | undefined, e: ReactEvent): void => {
            if (e.currentTarget.value !== oldval) {
                dispatch(updateNameNoSave(e.currentTarget.value)); // Can only be called when GameMode.NEW
            }
        },
        updateMinPlayersAction: (oldval: number | undefined, e: ReactEvent): void => {
            if (parseInt(e.currentTarget.value) !== oldval) {
                if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                    const game = ownProps.game as BoardgameServerState;
                    let val = parseInt(e.currentTarget.value); // Can assume exist due to validation on the field
                    dispatch(setGameMinPlayersAction(game.get('name'), val));
                }
                else {
                    dispatch(updateMinPlayersNoSave(parseInt(e.currentTarget.value)));
                }
            }
        },
        updateMaxPlayersAction: (oldval: number | undefined, e: ReactEvent): void => {
            if (parseInt(e.currentTarget.value) !== oldval) {
                if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                    const game = ownProps.game as BoardgameServerState;
                    let val = e.currentTarget.value.length > 0 ? parseInt(e.currentTarget.value) : undefined;
                    dispatch(setGameMaxPlayersAction(game.get('name'), val));
                }
                else {
                    if (e.currentTarget.value.length > 0) {
                        dispatch(updateMaxPlayersNoSave(parseInt(e.currentTarget.value)));
                    }
                    else {
                        dispatch(updateMaxPlayersNoSave(undefined));
                    }
                }
            }
        },
        updatePlayTimeAction: (oldval: string | undefined, e: ReactEvent): void => {
            if (e.currentTarget.value !== oldval) {
                if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                    const game = ownProps.game as BoardgameServerState;
                    let val = e.currentTarget.value.length > 0 ? e.currentTarget.value : undefined;
                    dispatch(setGamePlayTimeAction(game.get('name'), val));
                }
                else {
                    if (e.currentTarget.value.length > 0) {
                        dispatch(updatePlayTimeNoSave(e.currentTarget.value));
                    }
                    else {
                        dispatch(updatePlayTimeNoSave(undefined));
                    }
                }
            }
        },
        updateBoxArtAction: (oldval: string | undefined, e: ReactEvent): void => {
            if (e.currentTarget.value !== oldval) {
                if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                    const game = ownProps.game as BoardgameServerState;
                    let val = e.currentTarget.value.length > 0 ? e.currentTarget.value : undefined;
                    dispatch(setGameBoxArtAction(game.get('name'), val));
                }
                else {
                    if (e.currentTarget.value.length > 0) {
                        dispatch(updateBoxArtNoSave(e.currentTarget.value));
                    }
                    else {
                        dispatch(updateBoxArtNoSave(undefined));
                    }
                }
            }
        },
        updateBBGLinkAction: (oldval: string | undefined, e: ReactEvent): void => {
            if (e.currentTarget.value !== oldval) {
                if (ownProps && ownProps.game && ownProps.gameMode == GameMode.EDIT) {
                    const game = ownProps.game as BoardgameServerState;
                    let val = e.currentTarget.value.length > 0 ? e.currentTarget.value : undefined;
                    dispatch(setGameBBGLinkAction(game.get('name'), val));
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
}

export const GameContainer = connect<any, any, GameProps>(
    mapStateToProps,
    mapDispatchToProps
)(Game)