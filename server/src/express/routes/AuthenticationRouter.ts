import { Router, Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as session from 'express-session';

export class AuthenticationRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public loginPage(req: Request, res: Response, next: NextFunction) { 
        const response = {
            ...(<any>req).flash(),
            "loggedIn" : (req.user)?true:false
        }
        res.send(response)
    }

    public logoutPage(req: Request, res: Response, next: NextFunction) { 
        req.logout();
        req.session!.save((err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            res.redirect('/api/v1/auth/');
        });
    }

    init() {
        passport.use(new Strategy((username, password, done) => {
            if (username === 'sdickinson' && password === 'abc123') {
                return done(null, username);
            }
            return done(null, false, { message: 'Invalid User' });
        }));
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((id, done) => {
             // lookup by id
             console.log(id)
             done(null, {
                 user: id
             });
        });

        this.router.get('/', this.loginPage);
        this.router.post('/login', passport.authenticate('local', { 
            failureRedirect: '/api/v1/auth/', 
            failureFlash: true 
        }), (req, res, next) => {
            req.session!.save((err) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }
                res.redirect('/api/v1/auth/');
            });
        });
        this.router.post('/logout', this.logoutPage);
    }
}

const authenticationRoutes = new AuthenticationRouter();

export default authenticationRoutes.router;