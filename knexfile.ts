import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
            host : process.env.APP_HOST,
            user : process.env.APP_USER,
            password : process.env.APP_PASSWORD,
        filename: path.resolve(__dirname,  'src', 'database','pgdatabase'),
    },
    migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },  
    seeds:{
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};