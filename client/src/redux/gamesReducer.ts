import { List } from 'immutable';
import { BOARDGAME } from './state';
import { FetchGamesSuccess } from './action_types';
import { FetchGameAction } from './constants';

type AllGamesActions = FetchGamesSuccess;

function fetchGamesSuccess(games: Array<string>): List<BOARDGAME> {
    return List( games.map((game) => {
        return {
            name: game
        } as BOARDGAME;
    }));
}

export default function gamesReducer(state: List<BOARDGAME> = List(), action: AllGamesActions): List<BOARDGAME> {
    switch (action.type) {
        case FetchGameAction.FETCH_GAMES_SUCCESS:
            return fetchGamesSuccess(action.payload.data.games);
    }
    
    return state;
}
