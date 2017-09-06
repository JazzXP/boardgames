import { BoardgameServerState } from '../src/redux/state';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests Boardgame Server State')
class TestBoardgameServerState {
    @test('Tests toJS does not contain undefined fields')
    testToJSDoesntContainUndefineds() {
        const state = new BoardgameServerState({game: {name: 'Blah'}});
        expect(state.getIn(['game', 'minPlayers'])).to.be.undefined;
        const js = state.toJS();
        for(let key in js) {
            expect(js[key]).to.not.be.undefined;
        }
        expect(js.game.name).to.equal('Blah');
    }
}