import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "../swagger.config"
import dotenv from 'dotenv';
import api from "./api"

dotenv.config();

const PORT = process.env.PORT || 5000;

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


app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})