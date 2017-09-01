import * as path from 'path';
import * as express from 'express';
import * as session from 'express-session';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as mongoSanitize from 'express-mongo-sanitize';

import GamesRouter from './routes/GamesRouter';
import AuthenticationRouter from './routes/AuthenticationRouter';

var flash = require('connect-flash');

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
        this.express.use(mongoSanitize());
        this.express.use(cookieParser());
        this.express.set('trust proxy', 1); // For running behind a reverse proxy
        this.express.use(session({
            secret: 'blahblahblah',
            name: 'sessionId',
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true
                //secure: true,
                //domain: 'test.com'
            }
        }));
        this.express.use(passport.initialize());
        this.express.use(flash());
        this.express.use(passport.session());
    }

    private routes(): void {
        console.log(__dirname + '../../../../client/');
        this.express.use('/', express.static(__dirname + '/../../../../client/'));
        this.express.use('/api/v1/games', GamesRouter);
        this.express.use('/api/v1/auth', AuthenticationRouter);
    }
}

export default new App().express;