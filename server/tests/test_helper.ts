import * as chai from 'chai';
import chaiHttp = require('chai-http');

var chaiImmutable = require('chai-immutable');
chai.use(chaiImmutable);
chai.use(chaiHttp);