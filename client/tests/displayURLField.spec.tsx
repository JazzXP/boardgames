import * as React from 'react';
import { DisplayURLField } from '../src/components/DisplayURLField';
import { mount, render, shallow } from 'enzyme';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests Display URL Field')
class TestDisplayURLField {
    @test('readonly field renders')
    testReadOnlyRendersField() {
        const wrapper = mount(
            <DisplayURLField label="Test" url={'https://blah.com'} editMode={false} />
        );
        expect(wrapper.childAt(0).text()).to.contain('Test');
        expect(wrapper.find('a').prop('href')).to.equal('https://blah.com');
    }

    @test('editable field renders')
    testEditableRendersField() {
        const wrapper = mount(
            <DisplayURLField label="Test" url={'https://blah.com'} editMode={true} />
        );
        expect(wrapper.childAt(0).text()).to.contain('Test');
        expect(wrapper.find('input').prop('defaultValue')).to.equal('https://blah.com');
    }

    @test('No URL set')
    testNoURLSet() {
        const wrapper = mount(
            <DisplayURLField label="Test" editMode={false} />
        );
        expect(wrapper.childAt(0)).to.have.length(0);
    }

    @test('On Blur')
    testOnBlurSet(done: ()=>void) {
        const wrapper = mount(
            <DisplayURLField label="Test" editMode={true} onBlur={(e: any)=>{
                done();
            } } />
        );
        wrapper.find('input').simulate('blur');
    }
}