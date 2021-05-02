"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("./routes/userRouter");
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
dotenv_1.default.config();
app.use("/user", userRouter_1.userRouter);
app.listen(process.env.PORT || 3333, () => console.log("Servidor rodando na porta 3333"));
//# sourceMappingURL=index.js.map