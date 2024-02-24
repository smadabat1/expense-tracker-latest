import { Client as pgClient, Pool } from 'pg';


let db_connection: any;

if (!db_connection) {
    db_connection = new pgClient({
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: Number(process.env.PORT), 
        database: process.env.DATABASE
    })

    try {
        await db_connection.connect();
        console.log("(+) Connection with the DB is successful");
    } catch(err) {
        console.error("(-) Error connecting with DB", err);
        db_connection.end();
        db_connection = ""
    }
}



export default db_connection;

