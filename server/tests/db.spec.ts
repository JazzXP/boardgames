import { BOARDGAME } from '../src/state';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { DB } from '../src/data/db';
import { List } from 'immutable';

@suite('Mongo Database')
class TestDatabase {
    @test('getAllGames returns value')
    allGamesReturnsValue() {
        const db = new DB();
        db.getAllGames((games: List<string>) => {
            expect(games.count()).is.greaterThan(0);
        } );
    }

    @test('getGame returns a value with valid request')
    getGameReturnValueWithValidRequest() {
        const db = new DB();
        db.getGame('Zombicide', (game: BOARDGAME) => {
            expect(game).to.not.be.null;
        } );
    }

    @test('getGame returns null with invalid request')
    getGameReturnsNullWithInvalidRequest() {
        const db = new DB();
        db.getGame('blah', (game: BOARDGAME) => {
            expect(game).to.be.null;
        } );
    }

    @test('adding an entry adds a value')
    addEntryAddsValue() {
        const db = new DB();
        const dummyName = 'BlahBlahBlah';
        db.addGame({
            name: dummyName,
            minPlayers: 1,
            maxPlayers: 5
        }, (success: boolean) => {});
        db.getGame(dummyName, (game: BOARDGAME) => {
            expect(game.name).to.equal(dummyName);
            // Cleanup
            db.removeGame(dummyName);
        });
    }
}