import { createStore, Store } from 'redux';
import { BoardgameServerState } from './state';
import reducer from './reducer';

export default function makeStore(): Store<BoardgameServerState> {
    return createStore(reducer) as Store<BoardgameServerState>;
}