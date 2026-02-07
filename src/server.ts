import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "../swagger.config"
import envConfig from './config/env.config';
import api from "./api"


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', api);

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ 
        message: 'Welcome to the My Store API. See /docs for endpoints.' 
    });
});


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.listen(envConfig.port, () => {
    console.log(`server is running at port ${envConfig.port}`)
})