import SERVICE_IDENTIFIER from '../../constants';
import IDB from '../../interfaces/IDB';
import { BOARDGAME, BOARDGAME_UPDATE } from '../../state';
import { Router, Request, Response, NextFunction } from 'express';
import { Store } from 'redux';
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

    public updateOne(req: Request, res: Response, next: NextFunction) {
        let name: string = req.body.name;
        const db: IDB = container.get<IDB>(SERVICE_IDENTIFIER.DB);
        let update: BOARDGAME_UPDATE = JSON.parse(JSON.stringify({
            name: name,
            minPlayers: req.body.minPlayers,
            maxPlayers: req.body.maxPlayers,
            boxArt: req.body.boxArt,
            boardgameGeekLink: req.body.boardgameGeekLink
        }));
        // Lookup game
        db.updateGame(update, (success: boolean, game: BOARDGAME | undefined) => {
            if (success) {
                res.status(200)
                    .send({
                        message: `Success`,
                        status: res.status,
                        game: game
                    });
            }
            else {
                res.status(500)
                    .send({
                        message: `Failed`,
                        status: res.status,
                        game: game
                    });
            }
        });
    }

    public addOne(req: Request, res: Response, next: NextFunction) {
        let name: string = req.body.name;
        const db: IDB = container.get<IDB>(SERVICE_IDENTIFIER.DB);
        let addItem: BOARDGAME = JSON.parse(JSON.stringify({
            name: name,
            minPlayers: req.body.minPlayers,
            maxPlayers: req.body.maxPlayers,
            boxArt: req.body.boxArt,
            boardgameGeekLink: req.body.boardgameGeekLink
        }));

        db.addGame(addItem, (success: boolean, game: BOARDGAME | undefined) => {
            if (success) {
                res.status(200)
                    .send({
                        message: `Success`,
                        status: res.status,
                        game: game
                    });
            }
            else {
                res.status(500)
                    .send({
                        message: `Failed`,
                        status: res.status,
                        game: game
                    });
            }
        });
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/:id/update', this.updateOne);
        this.router.post('/:id/add', this.addOne);
    }
}

const gamesRoutes = new GamesRouter();

export default gamesRoutes.router;