import 'reflect-metadata';
import { BOARDGAME, BOARDGAME_UPDATE } from '../../src/state';
import IDB from '../../src/interfaces/IDB';

import { injectable } from 'inversify';
import { List } from 'immutable';


@injectable()
export default class FakeDB implements IDB {
    private MockGames = require('./games');

    addGame(game: BOARDGAME, callback: (success: boolean, gameUpdate: BOARDGAME | undefined) => void): void {
        this.MockGames.games.push(game);
        callback(true, game as BOARDGAME);
    }

    updateGame(game: BOARDGAME_UPDATE, callback: (success: boolean, gameUpdate: BOARDGAME | undefined) => void): void {
        this.MockGames.games.push(game);
        callback(true, game as BOARDGAME);
    }

    getGame(game: string, callback: (game: BOARDGAME) => void): void {
        callback(
            List<BOARDGAME>(this.MockGames.games).find((val: BOARDGAME) => {
                return val.name === game;
            })
        );
    }

    getAllGames(callback: (games: List<string>) => void): void {
        callback(List<string>(this.MockGames.games.map((val: BOARDGAME) => { return val.name })));
    }

    removeGame(game: string): void {
        //this.MockGames.games
    }

}