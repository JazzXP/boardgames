import gamesReducer from '../src/redux/gamesReducer';
import { FetchGamesSuccess } from '../src/redux/action_types';
import { FetchGameAction } from '../src/redux/constants';
import { BOARDGAME } from '../src/redux/state';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests the games reducer')
class TestGamesReducer {
    @test('Reducer returns boardgame list')
    testReducerMergesFetchGameResponse() {
        const action = {
            type: FetchGameAction.FETCH_GAMES_SUCCESS,
            payload: {
                data: {
                    games: ['Test1', 'Test2']
                }
            }
        } as FetchGamesSuccess;
        const newState = gamesReducer(undefined, action);
        expect(newState.size).to.equal(2);
        expect(newState.get(1).name).to.equal('Test2');
    }
}