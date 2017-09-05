import * as React from 'react';
import { MenuLogin } from '../src/components/MenuLogin';
import { Route, BrowserRouter } from 'react-router-dom';
import { mount, render, shallow } from 'enzyme';
import { List, Map } from 'immutable';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Provider } from 'react-redux';

@suite('Tests MenuLogin component')
class TestMenuLogin {
    @test('Renders MenuLogin')
    rendersBasics() {
        const wrapper = mount(<MenuLogin alignment="left"><div id="blah" /></MenuLogin>);
        expect(wrapper.find('#blah').length).to.equal(1);
    }

    @test('Closes component')
    testClosesComponent() {
        const wrapper = mount(<MenuLogin alignment="left"><div id="blah" /></MenuLogin>);
        wrapper.setState({visible: true});
        expect(wrapper.state().visible).to.equal(true);
        wrapper.find('button').simulate('click');
        expect(wrapper.state().visible).to.equal(false);
    }
}