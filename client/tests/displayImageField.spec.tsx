import * as React from 'react';
import { DisplayImageField } from '../src/components/DisplayImageField';
import { mount, render, shallow } from 'enzyme';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests Display Image Field')
class TestDisplayImageField {
    @test('readonly field renders')
    testReadOnlyRendersField() {
        const wrapper = mount(
            <DisplayImageField label="Test" imageURL={'http://blah.com/image.jpg'} editMode={false} />
        );
        expect(wrapper.childAt(0).text()).to.contain('Test');
        expect(wrapper.find('img').prop('src')).to.equal('http://blah.com/image.jpg');
    }

    @test('editable field renders')
    testEditableRendersField() {
        const wrapper = mount(
            <DisplayImageField label="Test" imageURL={'http://blah.com/image.jpg'} editMode={true} />
        );
        expect(wrapper.childAt(0).text()).to.contain('Test');
        expect(wrapper.find('input').prop('defaultValue')).to.equal('http://blah.com/image.jpg');
    }
}