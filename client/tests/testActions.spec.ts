import * as Action from '../src/redux/actions';
import { FetchGameAction, SET_EDIT_MODE, SET_BOARDGAME_STATE } from '../src/redux/constants';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'
import { Boardgame, BoardgameServerState } from '../src/redux/state';
import * as Immutable from 'immutable';

@suite('Tests Actions')
class TestActions {
    @test('Fetch Game')
    testFetchGame() {
        const successVal = {
            type: FetchGameAction.FETCH_GAME,
            payload: {
                request: {
                    method: 'get',
                    url: '/games/Blah'
                }
            }
        }

        const val = Action.fetchGame('Blah');
        expect(val).to.deep.equal(successVal);
    }

    @test('Fetch Games')
    testFetchGames() {
        const successVal = {
            type: FetchGameAction.FETCH_GAMES,
            payload: {
                request: {
                    method: 'get',
                    url: '/games'
                }
            }
        }
        const val = Action.fetchGames();
        expect(val).to.deep.equal(successVal);
    }

    @test('Set Edit Mode')
    testSetEditModeAction() {
        const successVal = {
            type: SET_EDIT_MODE,
            editMode: true
        }
        const val = Action.setEditModeAction(true);
        expect(val).to.deep.equal(successVal);
    }

    @test('Set Boardgame State')
    testSetBoardgameStateAction() {
        const successVal = {
            type: SET_BOARDGAME_STATE,
            game: {
                name: "Blah"
            }
        };
        const val = Action.setBoardgameState(new Boardgame({name: "Blah"}));
        expect(Immutable.fromJS(val).toJS()).to.deep.equal(successVal);
    }
}