import { List } from 'immutable';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

import { BoardgameServerState } from '../src/state';
import makeStore from '../src/store';

@suite('Store')
class TestStore {
    @test('is a Redux store')
    reduxStoreCreate() {
        const store = makeStore();
        expect(store.getState()).to.deep.equal(new BoardgameServerState());
    }

    @test('Redux store with the correct reducer')
    reduxStoreReducer() {
        const store = makeStore();

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: [
                {
                    name: "Zombicide",
                    minPlayers: 1,
                    maxPlayers: 6
                },
                {
                    name: "Legendary",
                    minPlayers: 1,
                    maxPlayers: 4
                }
            ]
        });

        const expected = {games: [{
                name: "Zombicide",
                minPlayers: 1,
                maxPlayers: 6
            },
            {
                name: "Legendary",
                minPlayers: 1,
                maxPlayers: 4
            }]};

        expect(store.getState().toJS()).to.deep.equal((new BoardgameServerState(expected)).toJS());
    }
}