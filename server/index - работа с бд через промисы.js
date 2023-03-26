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
//работа через промисы


const fields = ['schemaname', 'tablename', 'tableowner'];
const sql = 'SELECT ' + fields.join(', ') +
    ' FROM pg_catalog.pg_tables WHERE tableowner = $1';
pool.query(sql, ['postgres'])
    .then(res => {
        const { rows } = res;
        console.table(rows);
        fs.writeFile('message.html', rows, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });

    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        pool.end()
    })


const zlib = require('zlib');

const rs = fs.createReadStream('message.html');
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