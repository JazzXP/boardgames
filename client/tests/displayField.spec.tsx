import * as React from 'react';
import { DisplayField } from '../src/components/DisplayField';
import numberValidator from '../src/validators/numberValidator';
import { mount, render, shallow } from 'enzyme';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests Display Field')
class TestDisplayField {
    @test('readonly field renders')
    testReadOnlyRendersField() {
        const wrapper = mount(
            <DisplayField label="Test" fieldVal={'abc123'} editMode={false} />
        );
        expect(wrapper.childAt(0).text()).to.contain('Test');
        expect(wrapper.childAt(1).text()).to.contain('abc123');
    }

    @test('editable field renders')
    testEditableRendersField() {
        const wrapper = mount(
            <DisplayField label="Test" fieldVal={'abc123'} editMode={true} />
        );
        expect(wrapper.childAt(0).text()).to.contain('Test');
        expect(wrapper.find('input').prop('defaultValue')).to.contain('abc123');
    }

    @test('remove from editable resets errors')
    testResetErrors() {
        const wrapper = mount(
            <DisplayField 
                label="Test" 
                fieldVal={'123'} 
                editMode={true} 
                validator={numberValidator({error:'Invalid Number'})}
                />
        );
        const input = wrapper.find('input');
        (input.getNode() as any).value = 'abc';
        input.simulate('blur');
        expect(wrapper.state().error).to.not.be.undefined;
        wrapper.setProps({editMode: false});
        expect(wrapper.state().error).to.be.undefined;
    }

    @test('no change in edit mode does nothing')
    testChangeInEditModeDoesNothing() {
        const wrapper = mount(
            <DisplayField 
                label="Test" 
                fieldVal={'123'} 
                editMode={true} 
                validator={numberValidator({error:'Invalid Number'})}
                />
        );
        const input = wrapper.find('input');
        (input.getNode() as any).value = 'abc';
        input.simulate('blur');
        expect(wrapper.state().error).to.not.be.undefined;
        wrapper.setProps({editMode: true});
        expect(wrapper.state().error).to.not.be.undefined;
    }
}