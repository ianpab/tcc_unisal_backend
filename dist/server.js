"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var uploads_1 = __importDefault(require("../uploads"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json()); // para express entender json
app.use(routes_1.default);
app.use(uploads_1.default);
app.listen(process.env.PORT || 3333);
