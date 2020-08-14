"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var connection = knex_1.default({
    client: 'pg',
    connection: {
        host: process.env.APP_HOST,
        user: process.env.APP_USER,
        password: process.env.APP_PASSWORD,
        filename: process.env.DATABASE_NAME,
    },
    useNullAsDefault: true,
});
exports.default = connection;
