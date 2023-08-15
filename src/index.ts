import express, { Application, Request, Response } from 'express';
import compression  from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

import UserRoutes from './routers/UserRoutes';
import AuthRoutes from './routers/AuthRoutes';
import SalesRoutes from './routers/SalesRoutes';


class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins() {
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(
            cors({
                origin: 'http://localhost:3000', // Ganti dengan asal/frontend yang sesuai
                credentials: true, // Mengizinkan penggunaan kredensial
            })
        );
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send('ini adalah api menggunakan typesrcript');
        });

        this.app.use('/api/v1/users', UserRoutes);
        this.app.use('/api/v1/auth', AuthRoutes);
        this.app.use('/api/v1/sales', SalesRoutes);
    }
}


const port: number = 7000;
const app = new App().app;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`aplikasi ini menggunakan port ${port}`);
})