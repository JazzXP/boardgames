import SERVICE_IDENTIFIER from '../src/constants';
import { BOARDGAME } from '../src/state';
import * as chai from 'chai';
import { suite, test } from 'mocha-typescript'

import app from '../src/express/App';

import container from '../src/config/ioc_config';
import IDB from '../src/interfaces/IDB';
import FakeDB from './fakes/fakeDB';

const expect = chai.expect;

@suite('GET api/v1/games')
class TestGamesRootRoute {

    setup() {
        container.snapshot();
        container.unbind(SERVICE_IDENTIFIER.DB);
        container.bind<IDB>(SERVICE_IDENTIFIER.DB).toConstantValue(new FakeDB());
    }

    teardown() {
        container.restore();
    }

    @test('games responds with a JSON array')
    async getGamesReturnsArray() {
        this.setup();
        const res = await chai.request(app).get('/api/v1/games');
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.games).to.have.length(2);
        this.teardown();
    }

    @test('games should include Zombicide')
    async getGamesIncludesZombicide() {
        this.setup();
        const res = await chai.request(app).get('/api/v1/games');
        let Zombicide = res.body.games.find((game: string) => game === 'Zombicide');
        expect(Zombicide).to.exist;
        this.teardown();
    }
}

@suite ('GET api/v1/games/:id')
class TestGamesByID {
    setup() {
        container.snapshot();
        container.unbind(SERVICE_IDENTIFIER.DB);
        container.bind<IDB>(SERVICE_IDENTIFIER.DB).toConstantValue(new FakeDB());
    }

    teardown() {
        container.restore();
    }

    @test('responds with a single JSON object')
    async getByIDRespondsWithSingleObject() {
        this.setup();
        const res = await chai.request(app).get('/api/v1/games/Legendary');
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        this.teardown();
    }

    @test('should return Legendary')
    async getByIDRespondsWithLegendary() {
        this.setup();
        const res = await chai.request(app).get('/api/v1/games/Legendary');
        expect(res.body.game.minPlayers).to.equal(1);
        this.teardown();
    }

    @test('responds with 404 when not found')
    async getByIDResponds404WhenNotFound() {
        this.setup();
        try {
            const res = await chai.request(app).get('/api/v1/games/BlahBlahBlah');
        }
        catch (err) {
            expect(err.response.status).to.equal(404);
        }
        
        this.teardown();
    }
}