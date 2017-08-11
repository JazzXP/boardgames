import SERVICE_IDENTIFIER from '../../constants';
import IDB from '../../interfaces/IDB';
import { BOARDGAME } from '../../state';
import { Router, Request, Response, NextFunction } from 'express';
import { Store } from 'redux';
import { BoardgameServerState } from '../../state';
import { List } from 'immutable';
import container from '../../config/ioc_config';

export class GamesRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        const db: IDB = container.get<IDB>(SERVICE_IDENTIFIER.DB);
        db.getAllGames((games: List<string>) => {
            const response = {
                "games": games.toJS()
            }
            res.send(response)
        });
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = req.params.id;
        const db: IDB = container.get<IDB>(SERVICE_IDENTIFIER.DB);
        db.getGame(query, (game: BOARDGAME) => {
            if (game) {
                res.status(200)
                    .send({
                        message: 'Success',
                        status: res.status,
                        game
                    });
            }
            else {
                res.status(404)
                    .send({
                        message: `No game found with name ${query}`,
                        status: res.status
                    });
            } 
        });
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
    }
}

const gamesRoutes = new GamesRouter();

export default gamesRoutes.router;