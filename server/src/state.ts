import { Record, List } from 'immutable';

export type BOARDGAME = {
    name: string,
    minPlayers: number,
    maxPlayers?: number,
    boxArt?: string,
    boardgameGeekLink?: string
}

export type BOARDGAME_SERVER_STATE = {
    games?: List<BOARDGAME>,
    game?: BOARDGAME
}

export class BoardgameServerState extends Record({games: List<BOARDGAME>(), game: undefined} as BOARDGAME_SERVER_STATE) {
    public toJS(): any {
        return JSON.parse(JSON.stringify(super.toJS()));
    }
}

export const INITIAL_STATE = new BoardgameServerState();