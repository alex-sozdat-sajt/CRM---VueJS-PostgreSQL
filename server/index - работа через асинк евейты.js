const { Pool } = require('pg');
const http = require('http');
const fs = require('fs');
const pool = new Pool({ //пулл коннекш для того чтобы было несколько конн
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'belakt1',
    database: 'application'
});
//работа через асинк евейты
(
    async() => {
        const fields = ['schemaname', 'tablename', 'tableowner'].join(',');
        const sql = `SELECT ${fields} FROM pg_tables WHERE tableowner = $1`;
        const { rows } = await pool.query(sql, ['postgres']);
        console.table(rows);
        pool.end();
    })();


const zlib = require('zlib');

const rs = fs.createReadStream('index2.html');
const gs = zlib.createGzip();

const buffers = [];
let buffer = null;
gs.on('data', buffer => {
    buffers.push(buffer);

});
gs.on('end', () => {
    buffer = Buffer.concat(buffers);

});
rs.pipe(gs);
//делаем себе http сервер, и в него будут приходить
const server = http.createServer((request, response) => {
    console.log('request.url', request.url);
    response.writeHead(200, { 'Content-Encoding': 'gzip' });
    response.end(buffer);
});
server.listen(8000, () => console.log(`server started on port `));