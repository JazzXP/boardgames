import 'reflect-metadata';
import { BOARDGAME } from '../state';
import { injectable } from 'inversify';
import { List } from 'immutable';
import * as MongoDB from 'mongodb';
import * as Monk from 'monk';

import IDB from '../interfaces/IDB';

@injectable()
export class DB implements IDB {
    private db: Monk.IMonkManager;

    constructor() {
        this.db = Monk.default('localhost:27017/boardgames');
    }
    
    addGame(game: BOARDGAME, callback: (success: boolean) => void): void {
        this.db.get('games').update({game: game.name}, game)
            .then((doc) => {
                console.log(doc)
                callback(true);
            });
    }

    removeGame(game: string): void {
        this.db.get('games').remove({"name": game});
    }

    getGame(game: string, callback: (game: BOARDGAME) => void): void {
        this.db.get('games').findOne({"name": game}, {_id: false})
            .then((doc) => {
                callback(doc);
            });
    }

    getAllGames(callback: (games: List<string>) => void): void {
        let p: Promise<any> = this.db.get('games')
            .find({}, {'_id': false});
            p.then((docs) => {
                callback(List(docs.map((item: BOARDGAME) => {
                    return item.name;
                })));
            });
    }
}