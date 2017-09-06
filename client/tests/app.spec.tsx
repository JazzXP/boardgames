import * as React from 'react';
import { App } from '../src/components/App';
import { Route, BrowserRouter } from 'react-router-dom';
import { mount, render, shallow } from 'enzyme';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests App component')
class TestApp {
    @test('Renders Basic page')
    rendersBasics() {
        const wrapper = mount(<BrowserRouter><App className='' /></BrowserRouter>);
        expect(wrapper.find('MenuBar')).to.have.length(1);
        expect(wrapper.find('Route')).to.have.length.greaterThan(0);
    }
}