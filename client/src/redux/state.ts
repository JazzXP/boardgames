import { Record, List } from 'immutable';

export interface BOARDGAME {
    name: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string,
    playTime?: string
}

export type BOARDGAME_NO_NAME = {
    name?: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string,
    playTime?: string
}

export class Boardgame extends Record({name: '', minPlayers: undefined, maxPlayers: undefined, boxArt: undefined, boardgameGeekLink: undefined, playTime: undefined} as BOARDGAME) {
    public toJS(): any {
        return JSON.parse(JSON.stringify(super.toJS()));
    }
}


export type BOARDGAME_SERVER_STATE = {
    games?: List<Boardgame>,
    game?: Boardgame,
    payload?: any,
    editMode?: boolean,
    loggedIn?: boolean,
    loginErrorMessages?: Array<string>
}

export class BoardgameServerState extends Record({games: List<Boardgame>(), game: undefined, state: undefined, editMode: false, loggedIn: undefined, loginErrorMessages: undefined} as BOARDGAME_SERVER_STATE) {
    public toJS(): any {
        return JSON.parse(JSON.stringify(super.toJS()));
    }
}

export const INITIAL_STATE = new BoardgameServerState();