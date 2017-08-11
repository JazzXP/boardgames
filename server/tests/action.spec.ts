import { List } from 'immutable';
import { BOARDGAME, BoardgameServerState, INITIAL_STATE } from '../src/state';
import * as Actions from '../src/actions';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Test Actions')
class ActionsTest {
    @test('set entries')
    setEntries() {
        const state: BoardgameServerState = INITIAL_STATE;
        const entries = [{
                name: "Zombicide",
                minPlayers: 1,
                maxPlayers: 6
            }];
        
        const nextState = Actions.setEntries(state, entries);
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

    @test('adds an entry')
    addEntry() {
        const state = new BoardgameServerState({
            games: List.of<BOARDGAME>(
                {
                    name: "Zombicide",
                    minPlayers: 1,
                    maxPlayers: 6
                } as BOARDGAME
            )
        });

        const newGame: BOARDGAME = {
            name: 'Legendary',
            minPlayers: 1,
            maxPlayers: 4
        };

        const nextState = Actions.addEntry(state, newGame);
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