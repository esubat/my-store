import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "../swagger.config"
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ 
        message: 'Welcome to the My Store API. See /docs for endpoints.' 
    });
});


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})