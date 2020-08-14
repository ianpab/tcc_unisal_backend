"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
module.exports = {
    client: 'pg',
    connection: {
        host: process.env.APP_HOST,
        user: process.env.APP_USER,
        password: process.env.APP_PASSWORD,
        filename: process.env.DATABASE_NAME,
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};
