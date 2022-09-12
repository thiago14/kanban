import Http from './HttpInterface';
import express, { NextFunction, Request, Response } from 'express';

export default class ExpressAdapter implements Http {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(function(req: Request, res: Response, next: NextFunction) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
        this.app.use(function(req: Request, res: Response, next: NextFunction) {
            if (req.method === 'OPTIONS') return next();
            if (req.url === '/login') return next();

            const authorization = req.headers['authorization'];
            if (authorization) {
                const token = authorization.replace('Bearer ', '');
                //TODO :: Generate token;
                if (token === '123456') {
                    return next();
                }
            }
            return res.status(401).end();
        });
    }

    route(method: string, url: string, callback: Function): void {
        this.app[method](url, async function(req: Request, res: Response) {
            const output = await callback(req.params, req.body);
            res.json(output);
        });
    }

    listen(port: number): void {
        this.app.listen(port);
    }

}