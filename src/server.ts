import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import routes from './routes';


const app = express();
app.use(cors());
app.use(express.json());  // para express entender json

app.use(routes);


app.listen(process.env.PORT || 3333);   