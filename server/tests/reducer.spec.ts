import { ADD_ENTRY, SET_ENTRIES } from '../src/constants';
import { BOARDGAME, BoardgameServerState, INITIAL_STATE } from '../src/state';
import { List } from 'immutable';
import reducer from '../src/reducer';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Reducer')
class TestReducer {
    @test('handles SET_ENTRIES')
    handleSetEntries() {
        const initialState = INITIAL_STATE;
        const action = {
            type: SET_ENTRIES,
            entries: [ {
                    name: "Zombicide",
                    minPlayers: 1,
                    maxPlayers: 6
                }
            ]
        }

        const nextState = reducer(initialState, action);

        const expected = {
            games: [ {
                    name: "Zombicide",
                    minPlayers: 1,
                    maxPlayers: 6
                }
            ]
        }
        expect(nextState.toJS()).to.deep.equal(expected);
    }

    @test('handles ADD_ENTRY')
    handleAddEntry() {
        const initialState = new BoardgameServerState( {
            games: List<BOARDGAME>([{
                name: "Zombicide",
                minPlayers: 1,
                maxPlayers: 6
            }])
        })
        const action = {
            type: ADD_ENTRY,
            entry: {
                    name: "Legendary",
                    minPlayers: 1,
                    maxPlayers: 4
                }
        }

        const nextState = reducer(initialState, action);

        const expected = {
            games: [ {
                    name: "Zombicide",
                    minPlayers: 1,
                    maxPlayers: 6
                }, {
                    name: 'Legendary',
                    minPlayers: 1,
                    maxPlayers: 4
                }
            ]
        }
        expect(nextState.toJS()).to.deep.equal(expected);
    }

    @test('add multiple individual entries')
    handleAddMultipleEntries() {
        const action1 = {
            type: ADD_ENTRY,
            entry: {
                name: "Zombicide",
                minPlayers: 1,
                maxPlayers: 6
            }
        }
        const action2 = {
            type: ADD_ENTRY,
            entry: {
                    name: "Legendary",
                    minPlayers: 1,
                    maxPlayers: 4
                }
        }

        let nextState = reducer(INITIAL_STATE, action1);
        nextState = reducer(nextState, action2);

        const expected = {
            games: [ {
                    name: "Zombicide",
                    minPlayers: 1,
                    maxPlayers: 6
                }, {
                    name: 'Legendary',
                    minPlayers: 1,
                    maxPlayers: 4
                }
            ]
        }
        expect(nextState.toJS()).to.deep.equal(expected);
    }
}