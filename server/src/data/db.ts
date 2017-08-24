import 'reflect-metadata';
import { BOARDGAME, BOARDGAME_UPDATE } from '../state';
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
    
    updateGame(game: BOARDGAME_UPDATE, callback: (success: boolean, gameUpdate: BOARDGAME | undefined) => void): void {
        this.db.get('games').update({"name": game.name}, game)
            .then((doc) => {
                if (!doc) {
                    callback(false, undefined);
                    throw 'Unable to update';
                }
                this.db.get('games').findOne({game: game.name}).then((doc) => {
                    if (!doc) {
                        callback(false, undefined);
                        throw 'Unable to find';
                    }
                    callback(true, doc);
                }).catch((err) => {
                    callback(false, undefined);
                    throw err;
                });
            }).catch((err) => {
                callback(false, undefined);
                throw err;
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