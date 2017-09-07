import * as React from 'react';
import { Game, GameContainer } from '../src/components/Game';
import { Route, BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import { suite, test, slow } from 'mocha-typescript'
import { mount, render, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { List, Map } from 'immutable'
import * as Immutable from 'immutable'
import { BoardgameServerState } from '../src/redux/state';

@suite('Tests Game Field')
class TestGame {
    @test('field renders')
    testReadOnlyRendersField() {
        const wrapper = mount(<BrowserRouter><Game name="TestGame" editMode={false} /></BrowserRouter>);
        expect(wrapper.find('DisplayField').length).to.equal(4);
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
        const input = wrapper.findWhere(node => node.props().label === 'Name:').find('input');
        (input.getNode() as any).value = 'Blah';
        input.simulate('blur');
    }

    @test('click edit')
    testClickEdit(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type==='SET_EDIT_MODE') {
                expect(action.editMode).to.be.true;
                done();
            }

            return Map({"loggedIn": true, "editMode":false}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={false} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('button').at(0);
        input.simulate('click');
    }

    @test('click done')
    testClickDone(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type==='SET_EDIT_MODE') {
                expect(action.editMode).to.be.false;
                done();
            }

            return Map({"loggedIn": true, "editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.find('button').at(0);
        input.simulate('click');
    }

    @test('click edit in new mode')
    testClickEditInNew(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type==='GAME_EDIT_SAVE_NEW') {
                expect(action.payload).to.not.be.undefined;
                done();
            }

            return Map({"loggedIn": true, "editMode":false}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={false} gameMode={0} /></BrowserRouter></Provider>);
        const input = wrapper.find('button').at(0);
        input.simulate('click');
    }

    @test('click done in new mode')
    testClickDoneInNew(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type==='GAME_EDIT_SAVE_NEW') {
                expect(action.payload).to.not.be.undefined;
                done();
            }

            return Map({"loggedIn": true, "editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={0} /></BrowserRouter></Provider>);
        const input = wrapper.find('button').at(0);
        input.simulate('click');
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
        const input = wrapper.findWhere(node => node.props().label === 'Min Players:').find('input');
        (input.getNode() as any).value = 2;
        input.simulate('blur');
    }

    @test('clear min players field fails')
    testClearMinPlayersField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            return Immutable.fromJS({
                "editMode":true,
                "game": {
                    name: 'TestGame'
                }
            }); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" game={ new BoardgameServerState(Immutable.fromJS({game: { name:'TestGame' }})) } editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Min Players:').find('input');
        (input.getNode() as any).value = '';
        input.simulate('blur');
        const comp = wrapper.findWhere(node => node.props().label === 'Min Players:');
        expect((comp.getNode() as any).state.error).not.to.be.undefined;
        done();
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
        const input = wrapper.findWhere(node => node.props().label === 'Max Players:').find('input');
        (input.getNode() as any).value = 20;
        input.simulate('blur');
    }

    @test('clear max players field returns undefined')
    testClearMaxPlayersField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_MAX_PLAYERS') {
                expect(action.payload.request.data.maxPlayers).is.undefined;
                done();
            }
            return Immutable.fromJS({
                "editMode":true,
                "game": {
                    name: 'TestGame'
                }
            }); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" game={ new BoardgameServerState(Immutable.fromJS({game: { name:'TestGame' }})) } editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Max Players:').find('input');
        (input.getNode() as any).value = '';
        input.simulate('blur');
    }

    @test('clear max players field returns undefined in new')
    testClearMaxPlayersFieldInNew(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_MAX_PLAYERS_NO_SAVE') {
                expect(action.maxPlayers).is.undefined;
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={0} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Max Players:').find('input');
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
        const input = wrapper.findWhere(node => node.props().label === 'Box Art:').find('input');
        (input.getNode() as any).value = 'https://blah.com/image.png';
        input.simulate('blur');
    }

    @test('clear box art field returns undefined')
    testClearImageField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_BOX_ART') {
                expect(action.payload.request.data.boxArt).is.undefined;
                done();
            }
            return Immutable.fromJS({
                "editMode":true,
                "game": {
                    name: 'TestGame'
                }
            }); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" game={ new BoardgameServerState(Immutable.fromJS({game: { name:'TestGame' }})) } editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Box Art:').find('input');
        (input.getNode() as any).value = '';
        input.simulate('blur');
    }

    @test('clear box art field returns undefined in new mode')
    testClearImageFieldInNew(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_BOX_ART_NO_SAVE') {
                expect(action.boxArt).is.undefined;
                done();
            }
            return Immutable.fromJS({
                "editMode":true,
                "game": {
                    name: 'TestGame'
                }
            }); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" game={ new BoardgameServerState(Immutable.fromJS({game: { name:'TestGame' }})) } editMode={true} gameMode={0} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Box Art:').find('input');
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
        const input = wrapper.findWhere(node => node.props().label === 'Boardgame Geek Link:').find('input');
        (input.getNode() as any).value = 'https://blah.com';
        input.simulate('blur');
    }

    @test('clear boardgame geek field returns undefined')
    testClearBoardgameGeekField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_BBG_LINK') {
                expect(action.payload.request.data.boardgameGeekLink).is.undefined;
                done();
            }
            return Immutable.fromJS({
                "editMode":true,
                "game": {
                    name: 'TestGame'
                }
            }); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" game={ new BoardgameServerState(Immutable.fromJS({game: { name:'TestGame' }})) } editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Boardgame Geek Link:').find('input');
        (input.getNode() as any).value = '';
        input.simulate('blur');
    }

    @test('clear boardgame geek field returns undefined in new mode')
    testClearBoardgameGeekFieldInNew(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_BBG_LINK_NO_SAVE') {
                expect(action.boardgameGeekLink).is.undefined;
                done();
            }
            return Immutable.fromJS({
                "editMode":true,
                "game": {
                    name: 'TestGame'
                }
            }); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" game={ new BoardgameServerState(Immutable.fromJS({game: { name:'TestGame' }})) } editMode={true} gameMode={0} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Boardgame Geek Link:').find('input');
        (input.getNode() as any).value = '';
        input.simulate('blur');
    }

    @test('update play time field')
    testUpdatePlayTimeField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => {
            if (action.type == 'GAME_EDIT_UPDATE_PLAY_TIME_NO_SAVE') {
                expect(action.playTime).to.equal('10-20min');
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Play Time:').find('input');
        (input.getNode() as any).value ='10-20min';
        input.simulate('blur');
    }

    @test('clear play time field returns undefined')
    testClearPlayTimeField(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_PLAY_TIME') {
                expect(action.payload.request.data.playTime).is.undefined;
                done();
            }
            return Immutable.fromJS({
                "editMode":true,
                "game": {
                    name: 'TestGame'
                }
            }); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" game={ new BoardgameServerState(Immutable.fromJS({game: { name:'TestGame' }})) } editMode={true} gameMode={1} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Play Time:').find('input');
        (input.getNode() as any).value = '';
        input.simulate('blur');
    }

    @test('clear play time field returns undefined in new')
    testClearPlayTimeFieldInNew(done: ()=>void) {
        // Because this is async, we have to validate in the reducer
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'GAME_EDIT_UPDATE_PLAY_TIME_NO_SAVE') {
                expect(action.playTime).is.undefined;
                done();
            }
            return Map({"editMode":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer name="TestGame" editMode={true} gameMode={0} /></BrowserRouter></Provider>);
        const input = wrapper.findWhere(node => node.props().label === 'Play Time:').find('input');
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

        const input = wrapper.findWhere(node => node.props().label === 'Min Players:').find('input');
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

        const input = wrapper.findWhere(node => node.props().label === 'Max Players:').find('input');
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

        const input = wrapper.findWhere(node => node.props().label === 'Box Art:').find('input');
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

        const input = wrapper.findWhere(node => node.props().label === 'Boardgame Geek Link:').find('input');
        (input.getNode() as any).value = 'https://blah.com';
        input.simulate('blur');
    }

    @test('update play time field on server on edit')
    testUpdatePlayTimeFieldOnEdit(done: () => void) {
        const game = Map({
            "name" : "TestGame"
        });
        const store: Store<Map<any, any>> = createStore((state, action) => { 
                if (action.payload) {
                    expect(action.payload.request.data.playTime).to.equal('10-20min');
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

        const input = wrapper.findWhere(node => node.props().label === 'Play Time:').find('input');
        (input.getNode() as any).value = '10-20min';
        input.simulate('blur');
    }

    @test('setting values with same data does nothing', slow(500))
    testValueNotChanging(done: () => void) {
        let called = false;
        const game = Map({
            name : "TestGame",
            minPlayers: 1,
            maxPlayers: 2,
            boxArt: 'blah',
            boardgameGeekLink: 'blah2',
            playTime: '10-20min'
        });
        const store: Store<Map<any, any>> = createStore((state, action) => { 
                called = true;
                return Map({
                    "editMode": true, 
                    "gameMode": 0,
                    "game": game,
                }); 
            }
        );
        const wrapper = mount(<Provider store={store}><BrowserRouter><GameContainer 
            name={game.get('name') as string} 
            minPlayers={game.get('minPlayers') as number} 
            maxPlayers={game.get('maxPlayers') as number} 
            boxArt={game.get('boxArt') as string} 
            boardgameGeekLink={game.get('boardgameGeekLink') as string} 
            playTime='10-20min'
            game={new BoardgameServerState({game: game})} 
            editMode={true} 
            gameMode={0} 
        /></BrowserRouter></Provider>);
        called = false;
        
        function getInput(name: string) {
            return wrapper.findWhere(node => node.props().label === name).find('input');
        }

        var input = getInput('Name:');
        (input.getNode() as any).value = 'TestGame';
        input.simulate('blur');
        input = getInput('Min Players:');
        (input.getNode() as any).value = 1;
        input.simulate('blur');
        input = getInput('Max Players:');
        (input.getNode() as any).value = 2;
        input.simulate('blur');
        input = getInput('Box Art:');
        (input.getNode() as any).value = 'blah';
        input.simulate('blur');
        input = getInput('Boardgame Geek Link:');
        (input.getNode() as any).value = 'blah2';
        input.simulate('blur');
        input = getInput('Play Time:');
        (input.getNode() as any).value = '10-20min';
        input.simulate('blur');
        setTimeout(() => {
            if (!called)
                done();
        }, 50);
    }
}