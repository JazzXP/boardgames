import { addEntry, setEntries } from './actions';
import { ADD_ENTRY, SET_ENTRIES } from './constants';
import { AddEntry, SetEntriesAction } from './action_types';
import { fromJS } from 'immutable';
import { BoardgameServerState, INITIAL_STATE } from './state';

type AllActions = SetEntriesAction | AddEntry

export default function reducer(state: BoardgameServerState = INITIAL_STATE, action: AllActions): BoardgameServerState {
    let newState: BoardgameServerState = fromJS(state);
    switch (action.type) {
        case ADD_ENTRY:
            return addEntry(newState, action.entry);
        case SET_ENTRIES:
            return setEntries(newState, action.entries);
    }
    return newState;
}