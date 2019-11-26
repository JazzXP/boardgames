import * as React from 'react';
import { GamePage, GamePageContainer } from '../src/components/GamePage';
import { Route, MemoryRouter } from 'react-router-dom';
import { mount, render, shallow } from 'enzyme';
import { createStore, Store } from 'redux';
import { Map } from 'immutable';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Provider } from 'react-redux';

@suite('Tests Game Page component')
class TestGamePage {
    @test('Renders Game Page')
    rendersBasics() {
        
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            return Map({}); 
        });
        const wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/Blah']} initialIndex={0}><Route path="/:name" component={GamePage} /></MemoryRouter></Provider>);
        expect(wrapper.find('GamePage')).to.have.length(1);
    }

    @test('Renders Game Page Container')
    rendersContainer() {
        
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            return Map({}); 
        });
        const wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/Blah']} initialIndex={0}><Route path="/:name" component={GamePageContainer} /></MemoryRouter></Provider>);
        expect(wrapper.find('GamePage')).to.have.length(1);
    }

    @test('Game Page GameMode')
    testGameMode() {
        
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            return Map({}); 
        });
        const wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/Blah']} initialIndex={0}><Route path="/:name" component={GamePageContainer} /></MemoryRouter></Provider>);
        expect(wrapper.find('GamePage')).to.have.length(1);
    }
}