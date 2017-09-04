import * as React from 'react';
import { EditButton } from '../src/components/EditButton';
import { Route, BrowserRouter } from 'react-router-dom';
import { mount, render, shallow } from 'enzyme';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests Edit Button component')
class TestEditButton {
    @test('Button Renders "Edit" when not editing')
    renderEdit() {
        const wrapper = mount(<EditButton labelEdit="Edit" labelDone="Done" editMode={false} game={ {name: 'Blah'} } />);
        expect(wrapper.find('button')).to.have.length(1);
        expect(wrapper.find('button').text()).to.equal("Edit");
    }

    @test('Button Renders "Done" when not editing')
    renderDone() {
        const wrapper = mount(<EditButton labelEdit="Edit" labelDone="Done" editMode={true} game={ {name: 'Blah'} } />);
        expect(wrapper.find('button')).to.have.length(1);
        expect(wrapper.find('button').text()).to.equal("Done");
    }

    @test('Button calls action when clicked while not in edit mode')
    clickButtonWhileNotInEditMode(done: ()=>void) {
        const wrapper = mount(<EditButton labelEdit="Edit" labelDone="Done" editMode={false} game={ {name: 'Blah'} } clickAction={(e)=>{
            done();
        } }/>);
        wrapper.find('button').simulate('click');
    }

    @test('Button calls action when clicked while in edit mode')
    clickButtonWhileInEditMode(done: ()=>void) {
        const wrapper = mount(<EditButton labelEdit="Edit" labelDone="Done" editMode={true} game={ {name: 'Blah'} } clickAction={(e)=>{
            done();
        } }/>);
        wrapper.find('button').simulate('click');
    }

    @test('Button calls clicked without action')
    clickButtonWithoutAction() {
        // Just make sure it doesn't blow up
        const wrapper = mount(<EditButton labelEdit="Edit" labelDone="Done" editMode={true} game={ {name: 'Blah'} } />);
        wrapper.find('button').simulate('click');
    }
}