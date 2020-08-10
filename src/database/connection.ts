import knex from 'knex';
import path from 'path'; // resolve problemas de caminho

const connection = knex({
    client: 'pg',
    connection: {
        host : process.env.APP_HOST,
        user : process.env.APP_USER,
        password : process.env.APP_PASSWORD,
    filename: process.env.DATABASE_NAME,
    

    },
    useNullAsDefault: true,
});

export default connection;