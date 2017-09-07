import editModeReducer from '../src/redux/editModeReducer';
import { SET_EDIT_MODE } from '../src/redux/constants'

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests the edit mode reducer')
class TestEditModeReducer {
    @test('Reducer sets edit mode to true')
    testReducerSetsEditModeTrue() {
        const initialState = false;
        const newState = editModeReducer(initialState, {type: SET_EDIT_MODE, editMode: true});
        expect(newState).to.be.true;
    }

    @test('Reducer sets edit mode to false')
    testReducerSetsEditModeFalse() {
        const initialState = true;
        const newState = editModeReducer(initialState, {type: SET_EDIT_MODE, editMode: false});
        expect(newState).to.be.false;
    }

    @test('Reducer passes through true state when editMode undefined')
    testReducerSetPassesTrueStateWhenUndefined() {
        const initialState = true;
        const hackedReducer: (state: any, action: any)=>boolean = editModeReducer;
        const newState = hackedReducer(initialState, {type: SET_EDIT_MODE, editMode: undefined});
        expect(newState).to.be.true;
    }

    @test('Reducer passes through false state when editMode undefined')
    testReducerSetPassesFalseStateWhenUndefined() {
        const initialState = false;
        const hackedReducer: (state: any, action: any)=>boolean = editModeReducer;
        const newState = hackedReducer(initialState, {type: SET_EDIT_MODE, editMode: undefined});
        expect(newState).to.be.false;
    }

    @test('Reducer with undefined state')
    testReducerWithUndefinedState() {
        const initialState = false;
        const newState = editModeReducer(undefined, {type: SET_EDIT_MODE, editMode: true});
        expect(newState).to.be.true;
    }
}