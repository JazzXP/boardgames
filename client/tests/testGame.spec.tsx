import * as React from 'react';
import { Game, GameContainer } from '../src/components/Game';
import { Route, BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'
import { mount, render, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { List, Map } from 'immutable'

@suite('Tests Game Field')
class TestGame {
    @test('field renders')
    testReadOnlyRendersField() {
        const wrapper = mount(<BrowserRouter><Game name="TestGame" editMode={false} /></BrowserRouter>);
        expect(wrapper.find('DisplayField').length).to.equal(3);
        expect(wrapper.find('DisplayImageField').length).to.equal(1);
        expect(wrapper.find('DisplayURLField').length).to.equal(1);
        expect(wrapper.find('Link').length).to.equal(1);
    }

    @test('set name field')
    testSetNameField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_NAME_NO_SAVE') {
                expect(action.name).to.equal('Blah');
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={0} /></BrowserRouter></Provider>);
        const input = wrapper.find('input').at(0);
        (input.getNode() as any).value = 'Blah';
        input.simulate('blur');
    }

    @test('update min players field')
    testUpdateMinPlayersField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_MIN_PLAYERS_NO_SAVE') {
                expect(action.minPlayers).to.equal(2);
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('input').at(0);
        (input.getNode() as any).value = 2;
        input.simulate('blur');
    }

    @test('update max players field')
    testUpdateMaxPlayersField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_MAX_PLAYERS_NO_SAVE') {
                expect(action.maxPlayers).to.equal(20);
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('input').at(1);
        (input.getNode() as any).value = 20;
        input.simulate('blur');
    }

    @test('clear max players field returns undefined')
    testClearMaxPlayersField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_MAX_PLAYERS_NO_SAVE') {
                expect(action.maxPlayers).is.undefined;
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('input').at(1);
        (input.getNode() as any).value = '';
        input.simulate('blur');
    }

    @test('update box art field')
    testUpdateImageField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_BOX_ART_NO_SAVE') {
                expect(action.boxArt).to.equal('https://blah.com/image.png');
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('input').at(2);
        (input.getNode() as any).value = 'https://blah.com/image.png';
        input.simulate('blur');
    }

    @test('clear box art field returns undefined')
    testClearImageField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_BOX_ART_NO_SAVE') {
                expect(action.boxArt).is.undefined;
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('input').at(2);
        (input.getNode() as any).value = '';
        input.simulate('blur');
    }

    @test('update boardgame geek field')
    testUpdateBoardgameGeekField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_BBG_LINK_NO_SAVE') {
                expect(action.boardgameGeekLink).to.equal('https://blah.com');
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('input').at(3);
        (input.getNode() as any).value = 'https://blah.com';
        input.simulate('blur');
    }

    @test('clear boardgame geek field returns undefined')
    testClearBoardgameGeekField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_BBG_LINK_NO_SAVE') {
                expect(action.boardgameGeekLink).is.undefined;
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('input').at(3);
        (input.getNode() as any).value = '';
        input.simulate('blur');
    }

    @test('update min players field on server on edit')
    testUpdateMinPlayersFieldOnEdit(done: () => void) {
        const game = Map({
            "name" : "TestGame"
        });
        const store: Store<Map<any, any>> = createStore((state, action) => { 
                if (action.payload) {
                    expect(action.payload.request.data.minPlayers).to.equal(2);
                    done();
                }                    
                return Map({
                    "editMode": true, 
                    "gameMode": 1,
                    "game": game,
                }); 
            }, 
        );
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name={game.get('name')} game={game} editMode={true} gameMode={1} /></BrowserRouter></Provider>);

        const input = wrapper.find('input').at(0);
        (input.getNode() as any).value = 2;
        input.simulate('blur');
    }

    @test('update max players field on server on edit')
    testUpdateMaxPlayersFieldOnEdit(done: () => void) {
        const game = Map({
            "name" : "TestGame"
        });
        const store: Store<Map<any, any>> = createStore((state, action) => { 
                if (action.payload) {
                    expect(action.payload.request.data.maxPlayers).to.equal(20);
                    done();
                }                    
                return Map({
                    "editMode": true, 
                    "gameMode": 1,
                    "game": game,
                }); 
            }, 
        );
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name={game.get('name')} game={game} editMode={true} gameMode={1} /></BrowserRouter></Provider>);

        const input = wrapper.find('input').at(1);
        (input.getNode() as any).value = 20;
        input.simulate('blur');
    }

    @test('update box art field on server on edit')
    testUpdateBoxArtFieldOnEdit(done: () => void) {
        const game = Map({
            "name" : "TestGame"
        });
        const store: Store<Map<any, any>> = createStore((state, action) => { 
                if (action.payload) {
                    expect(action.payload.request.data.boxArt).to.equal('https://blah.com/boxart.png');
                    done();
                }                    
                return Map({
                    "editMode": true, 
                    "gameMode": 1,
                    "game": game,
                }); 
            }, 
        );
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name={game.get('name')} game={game} editMode={true} gameMode={1} /></BrowserRouter></Provider>);

        const input = wrapper.find('input').at(2);
        (input.getNode() as any).value = 'https://blah.com/boxart.png';
        input.simulate('blur');
    }

    @test('update boardgame geek field on server on edit')
    testUpdateBoardgameGeekFieldOnEdit(done: () => void) {
        const game = Map({
            "name" : "TestGame"
        });
        const store: Store<Map<any, any>> = createStore((state, action) => { 
                if (action.payload) {
                    expect(action.payload.request.data.boardgameGeekLink).to.equal('https://blah.com');
                    done();
                }                    
                return Map({
                    "editMode": true, 
                    "gameMode": 1,
                    "game": game,
                }); 
            }, 
        );
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name={game.get('name')} game={game} editMode={true} gameMode={1} /></BrowserRouter></Provider>);

        const input = wrapper.find('input').at(3);
        (input.getNode() as any).value = 'https://blah.com';
        input.simulate('blur');
    }
}