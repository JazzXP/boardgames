import numberValidator from '../src/validators/numberValidator';
import urlValidator from '../src/validators/urlValidator';
import imageURLValidator from '../src/validators/imageURLValidator';

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript'

@suite('Tests Validators')
class TestValidators {
    @test('Tests number validator returns true on number')
    testNumberValidatorReturnsTrueOnNumber() {
        const val = numberValidator({error: 'Invalid Number'})('1');
        expect(val).to.equal(true);
    }

    @test('Tests number validator returns error message when not a number')
    testNumberValidatorReturnsMessageWhenNotNumber() {
        const val = numberValidator({error: 'Invalid Number'})('abc');
        expect(val).to.equal('Invalid Number');
    }

    @test('Tests number validator returns error message when undefined')
    testNumberValidatorReturnsMessageWhenUndefined() {
        const tempValidator = <(input: any)=>true|string>numberValidator({error: 'Invalid Number'});
        const val = tempValidator(undefined);
        expect(val).to.equal('Invalid Number');
    }

    @test('Tests number validator returns error message when blank')
    testNumberValidatorReturnsMessageWhenBlank() {
        const val = numberValidator({error: 'Invalid Number'})('');
        expect(val).to.equal('Invalid Number');
    }

    @test('Tests number validator returns error message when no options')
    testNumberValidatorReturnsMessageWhenNoOptions() {
        const tempValidator = <(options?: any)=>(input: string)=>true|string>numberValidator;
        const val = tempValidator()('1');
        expect(val).to.not.be.true;
    }

    @test('Tests url validator returns true with valid URL (also tests regex validator)')
    testURLValidatorReturnsTrueOnValid() {
        const val = urlValidator({error: 'Invalid URL'})('http://www.sdickinson.com');
        expect(val).to.equal(true);
    }

    @test('Tests url validator returns false with invalid URL')
    testURLValidatorReturnsFalseOnInvalid() {
        const val = urlValidator({error: 'Invalid URL'})('http://sdickinson');
        expect(val).to.equal('Invalid URL');
    }

    @test('Tests url validator returns true with valid https URL')
    testURLValidatorReturnsTrueOnValidHttps() {
        const val = urlValidator({error: 'Invalid URL'})('https://www.sdickinson.com/blah');
        expect(val).to.equal(true);
    }

    @test('Tests url validator returns error with no options')
    testURLValidatorReturnsErrorOnNoOptions() {
        const tempValidator = <(options?: any)=>(input: string)=>true|string>urlValidator;
        const val = tempValidator()('http://www.sdickinson.com');
        expect(val).to.not.equal(true);
    }

    @test('Tests image url validator returns true with valid image URL')
    testImageURLValidatorReturnsTrueOnValid() {
        const val = imageURLValidator({error: 'Invalid Image URL'})('http://www.sdickinson.com/image.jpg');
        expect(val).to.equal(true);
    }

    @test('Tests image url validator returns false with invalid image URL')
    testImageURLValidatorReturnsFalseOnInvalid() {
        const val = imageURLValidator({error: 'Invalid Image URL'})('http://sdickinson');
        expect(val).to.equal('Invalid Image URL');
    }

    @test('Tests image url validator returns true with valid https image URL')
    testImageURLValidatorReturnsTrueOnValidHttps() {
        const val = imageURLValidator({error: 'Invalid Image URL'})('https://www.sdickinson.com/blah.gif');
        expect(val).to.equal(true);
    }

    @test('Tests image url validator returns error with no options')
    testImageURLValidatorReturnsErrorOnNoOptions() {
        const tempValidator = <(options?: any)=>(input: string)=>true|string>imageURLValidator;
        const val = tempValidator()('http://www.sdickinson.com/bob.svg');
        expect(val).to.not.equal(true);
    }
}