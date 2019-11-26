import * as chai from 'chai';
import * as chaiEmzyme from 'chai-enzyme';
import { JSDOM } from 'jsdom';
var chaiImmutable = require('chai-immutable');
chai.use(chaiImmutable);
chai.use(chaiEmzyme());

const doc = new JSDOM('<!doctype html><html><body></body></html>');
(<any>global).window = doc.window;
(<any>global).document = doc.window.document;
(<any>global).navigator = { userAgent: 'node.js' };
