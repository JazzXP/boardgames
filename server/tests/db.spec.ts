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
    addEntryAddsValue(done: any) {
        const db = new DB();
        const dummyName = 'BlahBlahBlah';
        try {
            db.addGame({
                name: dummyName,
                minPlayers: 1,
                maxPlayers: 5
            }, (success: boolean, gameUpdate: BOARDGAME | undefined) => {
                expect(success).to.be.true;
                expect(gameUpdate).to.not.be.undefined;
                expect(gameUpdate!.name).to.equal(dummyName);
                done();
            });
        }
        catch (err) {
            console.log(err);
            done();
        }
        finally {
            db.removeGame(dummyName);
        }
    }
}