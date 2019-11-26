import gameEditReducer from '../src/redux/gameEditReducer';
import { GameEdit, FetchGameAction } from '../src/redux/constants';
import { Boardgame } from '../src/redux/state';
import { 
    GameEditMinPlayersActionSuccess,
    GameEditMaxPlayersActionSuccess,
    GameEditBoxArtActionSuccess,
    GameEditBBGLinkActionSuccess,
    GameEditPlayTimeActionSuccess,
    GameEditSaveNewActionSuccess,
    UpdateNameNoSave,
    UpdateMinPlayersNoSave,
    UpdateMaxPlayersNoSave,
    UpdateBoxArtNoSave,
    UpdateBoardgameGeekLinkNoSave,
    UpdatePlayTimeNoSave
 } from '../src/redux/gameEditActionTypes';
 import {
    FetchGameSuccess,
} from '../src/redux/action_types';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests the game edit reducer')
class TestGameEditReducer {
    createDummyBoardgame(): Boardgame {
        return new Boardgame({
            name: 'Dummy'
        });
    }

    createFullBoardgame(): Boardgame {
        return new Boardgame({
            name: 'Dummy',
            minPlayers: 1,
            maxPlayers: 2,
            boxArt: 'https://boxart.com/boxart.jpg',
            boardgameGeekLink: 'https://boardgamegeek.com/dummy',
            playTime: '10-20min'
        });
    }

    @test('No action reducer')
    testNoActionReducer() {
        const action = {
            type: 'BlahBlah',
            data: 'Dummy'
        };
        const hackedReducer: (state: any, action: any)=>any = gameEditReducer;

        const newState = hackedReducer(this.createFullBoardgame(), action);
        expect(newState).to.deep.equal(this.createFullBoardgame());
    }

    @test('Reducer merges min players response')
    testReducerMergesMinPlayers() {
        const action = {
            type: GameEdit.GAME_EDIT_MIN_PLAYERS_SUCCESS,
            payload: {
                data: {
                    game: {
                        minPlayers: 5,
                    }
                }
            }
        } as GameEditMinPlayersActionSuccess;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(5);
        expect(newState.get('maxPlayers')).to.equal(2);
    }

    @test('Reducer merges max players response')
    testReducerMergesMaxPlayers() {
        const action = {
            type: GameEdit.GAME_EDIT_MAX_PLAYERS_SUCCESS,
            payload: {
                data: {
                    game: {
                        maxPlayers: 5,
                    }
                }
            }
        } as GameEditMaxPlayersActionSuccess;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('maxPlayers')).to.equal(5);
    }

    @test('Reducer merges box art response')
    testReducerMergesBoxArt() {
        const action = {
            type: GameEdit.GAME_EDIT_BOX_ART_SUCCESS,
            payload: {
                data: {
                    game: {
                        boxArt: 'https://boxart.com',
                    }
                }
            }
        } as GameEditBoxArtActionSuccess;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('boxArt')).to.equal('https://boxart.com');
    }

    @test('Reducer merges boardgame geek response')
    testReducerMergesBoardgameGeekLink() {
        const action = {
            type: GameEdit.GAME_EDIT_BBG_LINK_SUCCESS,
            payload: {
                data: {
                    game: {
                        boardgameGeekLink: 'https://boardgamegeek.com',
                    }
                }
            }
        } as GameEditBBGLinkActionSuccess;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('boardgameGeekLink')).to.equal('https://boardgamegeek.com');
    }

    @test('Reducer merges play time response')
    testReducerMergesPlayTime() {
        const action = {
            type: GameEdit.GAME_EDIT_BBG_LINK_SUCCESS,
            payload: {
                data: {
                    game: {
                        playTime: '20-30min',
                    }
                }
            }
        } as GameEditBBGLinkActionSuccess;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('playTime')).to.equal('20-30min');
    }

    @test('Reducer merges response for new game')
    testReducerMergesNewGameResponse() {
        const action = {
            type: GameEdit.GAME_EDIT_SAVE_NEW_SUCCESS,
            payload: {
                data: {
                    game: this.createFullBoardgame()
                }
            }
        } as GameEditSaveNewActionSuccess;
        const newState = gameEditReducer(undefined, action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('name')).to.equal('Dummy');
    }

    @test('Reducer merges response for fetch game')
    testReducerMergesFetchGameResponse() {
        const action = {
            type: FetchGameAction.FETCH_GAME_SUCCESS,
            payload: {
                data: {
                    game: this.createFullBoardgame()
                }
            }
        } as FetchGameSuccess;
        const newState = gameEditReducer(undefined, action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('name')).to.equal('Dummy');
    }

    @test('Reducer updates name')
    testReducerUpdatesName() {
        const action = {
            type: GameEdit.UPDATE_NAME_NO_SAVE,
            name: 'Blah'            
        } as UpdateNameNoSave;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('name')).to.equal('Blah');
    }

    @test('Reducer updates min players')
    testReducerUpdatesMinPlayers() {
        const action = {
            type: GameEdit.UPDATE_MIN_PLAYERS_NO_SAVE,
            minPlayers: 5
        } as UpdateMinPlayersNoSave;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(5);
        expect(newState.get('maxPlayers')).to.equal(2);
    }

    @test('Reducer updates max players')
    testReducerUpdatesMaxPlayers() {
        const action = {
            type: GameEdit.UPDATE_MAX_PLAYERS_NO_SAVE,
            maxPlayers: 5
        } as UpdateMaxPlayersNoSave;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('maxPlayers')).to.equal(5);
    }

    @test('Reducer updates box art')
    testReducerUpdatesBoxArt() {
        const action = {
            type: GameEdit.UPDATE_BOX_ART_NO_SAVE,
            boxArt: 'https://boxart.com'
        } as UpdateBoxArtNoSave;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('boxArt')).to.equal('https://boxart.com');
    }

    @test('Reducer updates boardgame geek link')
    testReducerUpdatesBoardgameGeekLink() {
        const action = {
            type: GameEdit.UPDATE_BBG_LINK_NO_SAVE,
            boardgameGeekLink: 'https://boardgamegeek.com'
        } as UpdateBoardgameGeekLinkNoSave;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('boardgameGeekLink')).to.equal('https://boardgamegeek.com');
    }

    @test('Reducer updates play time')
    testReducerPlayTime() {
        const action = {
            type: GameEdit.UPDATE_PLAY_TIME_NO_SAVE,
            playTime: '20-40min'
        } as UpdatePlayTimeNoSave;
        const newState = gameEditReducer(this.createFullBoardgame(), action);
        expect(newState.get('minPlayers')).to.equal(1);
        expect(newState.get('playTime')).to.equal('20-40min');
    }
}