import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from './routes/userRouter';

const app: Express = express();
app.use(cors());
app.use(express.json())

dotenv.config();

app.use("/user", userRouter)

app.listen(3333, () => console.log("Servidor rodando na porta 3333"))
