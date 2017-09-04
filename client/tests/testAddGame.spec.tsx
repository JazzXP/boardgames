import * as React from 'react';
import { AddGamePage, AddGamePageContainer } from '../src/components/AddGame';
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
        const wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/Blah']} initialIndex={0}><Route path="/:name" component={AddGamePageContainer} /></MemoryRouter></Provider>);
        expect(wrapper.find('AddGamePage')).to.have.length(1);
    }
}