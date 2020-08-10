import knex from 'knex';
import path from 'path'; // resolve problemas de caminho

const connection = knex({
    client: 'pg',
    connection: {
        host : process.env.APP_HOST,
        user : process.env.APP_USER,
        password : process.env.APP_PASSWORD,
    filename: path.resolve(__dirname,  'src', 'database','pgdatabase'),

    },
    useNullAsDefault: true,
});

export default connection;