import { Record, List } from 'immutable';

export interface BOARDGAME {
    name: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string,
}

export type BOARDGAME_NO_NAME = {
    name?: string,
    minPlayers?: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string,
}

export class Boardgame extends Record({name: '', minPlayers: undefined, maxPlayers: undefined, boxArt: undefined, boardgameGeekLink: undefined} as BOARDGAME) {
    public toJS(): any {
        return JSON.parse(JSON.stringify(super.toJS()));
    }
}


export type BOARDGAME_SERVER_STATE = {
    games?: List<Boardgame>,
    game?: Boardgame,
    payload?: any,
    editMode?: boolean,
    loggedIn?: boolean
}

export class BoardgameServerState extends Record({games: List<Boardgame>(), game: undefined, state: undefined, editMode: false, loggedIn: undefined} as BOARDGAME_SERVER_STATE) {
    public toJS(): any {
        return JSON.parse(JSON.stringify(super.toJS()));
    }
}

export const INITIAL_STATE = new BoardgameServerState();