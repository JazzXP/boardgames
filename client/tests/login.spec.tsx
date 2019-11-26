import * as React from 'react';
import { Login, LoginContainer } from '../src/components/Login';
import { Route, BrowserRouter } from 'react-router-dom';
import { mount, render, shallow } from 'enzyme';
import { createStore, Store } from 'redux';
import { List, Map } from 'immutable';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { Provider } from 'react-redux';

@suite('Tests Login component')
class TestLogin {
    @test('Renders Basic Login Form')
    rendersBasics() {
        const wrapper = mount(<BrowserRouter><Login /></BrowserRouter>);
        expect(wrapper.find('input')).to.have.length(2);
        expect(wrapper.find('input[type="password"]')).to.have.length(1);
        expect(wrapper.find('button')).to.have.length(1);
        expect(wrapper.find('button').text()).to.equal('Login');
    }

    @test('Renders a logout button when logged in')
    renderLoggedInShowsLogout() {
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            return Map({"loggedIn":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><LoginContainer /></BrowserRouter></Provider>);
        expect(wrapper.find('input')).to.have.length(0);
        expect(wrapper.find('button')).to.have.length(1);
        expect(wrapper.find('button').text()).to.equal('Logout');
    }

    @test('Sends log in message when login clicked')
    sendsLoginMessageWhenButtonClicked(done: ()=>void) {
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type === 'LOGIN_DO_LOGIN') {
                expect(action.payload.request.data.username).to.equal('BlahUser');
                expect(action.payload.request.data.password).to.equal('BlahPassword');
                done();
            }
            return Map({"loggedIn":false}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><LoginContainer /></BrowserRouter></Provider>);
        const usernameInput: any = wrapper.find('input').at(0);
        const passwordInput: any = wrapper.find('input').at(1);
        const loginButton: any = wrapper.find('button');
        usernameInput.getNode().value = 'BlahUser';
        passwordInput.getNode().value = 'BlahPassword';
        usernameInput.simulate('change');
        passwordInput.simulate('change');
        loginButton.simulate('click');
    }

    @test('Sends logout message when button clicked while logged in')
    sendsLogoutMessageWhenButtonClickedWhileLoggedIn(done: ()=>void) {
        const store: Store<Map<any, any>> = createStore((state, action) => { 
            if (action.type === 'LOGIN_DO_LOGOUT') {
                done();
            }
            return Map({"loggedIn":true}); 
        });
        const wrapper = mount(<Provider store={store}><BrowserRouter><LoginContainer /></BrowserRouter></Provider>);
        const logoutButton: any = wrapper.find('button');
        logoutButton.simulate('click');
    }
}