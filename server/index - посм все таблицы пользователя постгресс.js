const { Pool } = require('pg');
const http = require('http');
const pool = new Pool({ //пулл коннекш для того чтобы было несколько конн
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'belakt1',
    database: 'application'
});

const fields = ['schemaname', 'tablename', 'tableowner'].join(',');
//посм все таблицы пользователя постгресс
const sql = `SELECT ${fields} FROM pg_tables WHERE tableowner = $1`;
pool.query(sql, ['postgres'], (err, res) => {
    if (err) {
        throw err;

    }
    console.dir({ res });
    console.table(res.fields);
    console.table(res.rows);
    const server = http.createServer((request, response) => {
        // console.log('request.url', request.url);

        // response.end(res.fields);s
    });
    server.listen(8000, () => console.log(`server started on port`));

    pool.end(); //пулл енд чтобы разорвать соединение
});