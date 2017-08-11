import SERVICE_IDENTIFIER from '../constants';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import GamesRouter from './routes/GamesRouter';

// Main Express.JS webserver
class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        console.log(__dirname + '../../../../client/');
        this.express.use('/', express.static(__dirname + '/../../../../client/'));
        this.express.use('/api/v1/games', GamesRouter);
    }
}

export default new App().express;