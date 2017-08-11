import { List } from 'immutable';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'
import { setEntries } from '../src/actions';
import { BOARDGAME, BoardgameServerState, INITIAL_STATE } from '../src/state';

@suite('State Logic')
class TestStateLogic {
    @test('adds entries to the state')
    setEntries() {
        const state = INITIAL_STATE;
        const entries = List.of<BOARDGAME>(
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
        );
        const nextState = setEntries(state, entries);
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
        expect(nextState.toJS()).to.deep.equal(expected); 
    }
}