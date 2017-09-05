import * as React from 'react';
import { MenuBar } from '../src/components/MenuBar';
import { Route, BrowserRouter } from 'react-router-dom';
import { mount, render, shallow } from 'enzyme';
import { createStore, Store } from 'redux';
import { List, Map } from 'immutable';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Provider } from 'react-redux';

@suite('Tests MenuBar component')
class TestMenuBar {
    @test('Renders MenuBar')
    rendersBasics() {
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            return Map({}); 
        });
        const wrapper = mount(<Provider store={store}><MenuBar /></Provider>);
        expect(wrapper.find('MenuLogin').length).to.equal(1);
    }

    @test('MenuBar Open')
    testOpenMenuBar() {
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            return Map({}); 
        });
        const wrapper = mount(<Provider store={store}><MenuBar /></Provider>);
        const btns = wrapper.find('button');
        btns.at(btns.length-1).simulate('click');
        expect((wrapper.find('MenuLogin').getNode() as any).state.visible).to.be.true; // Dodgy as fuck
    }
}