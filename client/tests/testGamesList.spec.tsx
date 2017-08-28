import * as React from 'react';
import { GamesList, GamesListContainer } from '../src/components/GamesList';
import { List, Map } from 'immutable'
import { Route, BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'
import { mount, render, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';

@suite('Tests GamesList Page')
class TestGame {
    @test('Page Renders correct data')
    testGamesListRendersItems() {
        const store: Store<Map<any, any>> = createStore((state, action) => { return Map({}); });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GamesList games={List(['Test1', 'Test2'])} /></BrowserRouter></Provider>);
        expect(wrapper.find('li').length).to.equal(2);
        expect(wrapper.find('Link').length).to.equal(3); // One each for the <li> and then the Login component
        expect(wrapper.find('ul').childAt(0).text()).to.equal('Test1');
        expect(wrapper.find('ul').childAt(1).text()).to.equal('Test2');
    }

    @test('Page mount calls list function')
    testGamesListMountCallsListFunction(done: () => void) {
        const validateMountLoadData = () => {
            expect(true).to.be.true;
            done();
        }
        const store: Store<Map<any, any>> = createStore((state, action) => { return Map({}); });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GamesList games={List(['Test1', 'Test2'])} loadGames={validateMountLoadData} /></BrowserRouter></Provider>);
    }

    @test('Smart Component')
    testGamesListComponent(done: () => void) {
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type == 'FETCH_GAMES') {
                if (action.payload) {
                    expect(action.payload.request.method).to.equal('get');
                    expect(action.payload.request.url).to.equal('/games');
                    done();
                }                
            }
            return Map({"games":List([{"name" : 'Game1'}, {"name" : 'Game2'}])}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><GamesListContainer games={List(['Test1', 'Test2'])} /></BrowserRouter></Provider>);
    }
}