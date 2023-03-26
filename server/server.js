const { on } = require('events');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { Pool, Client } = require('pg');

//пример переписан на упращенный вариант
const pool = new Pool({
    host: '127.0.0.2',
    port: 5432,
    database: 'crm',
    user: 'postgres',
    password: 'belakt1',

});


const STATIC_PATH = path.join(process.cwd(), './static');

const MIME_TYPES = {
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    css: 'text/css',
    png: 'image/png',
    ico: 'image/x-icon',
    svg: 'image/svg+xml'
};

const serveFile = name => {
    const filePath = path.join(STATIC_PATH, name);
    if (!filePath.startsWith(STATIC_PATH)) {
        // console.log(`Can't be served: ${name}`);
        return null;
    }
    const stream = fs.createReadStream(filePath);
    // console.log(`Served: ${name}`);
    return stream;
};

http.createServer((req, res) => {
  
    const { url } = req;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', '*');
    
    console.log('URL/////////////////////////////////////////////// - ', url);
   
    if (url == '/suppliers' || url == '/categories' || url == '/shippers' || url == '/region' ||
        url == '/products' || url == '/employees'
    ) {
        const sql = `SELECT * FROM ${url.slice(1)}`;
      
        pool.query(sql, (err, resp) => {
            if (err) {
                throw err;
            }
            //запись в файл ответа сервера;
            fs.writeFile('content.html', resp, () => {
             
            })
            res.end(JSON.stringify(resp))
        });

    } else if (url == '/dataFromDb') {

        const sql = `SELECT * FROM crmuser`;
        pool.query(sql, (err, resp) => {
            if (err) {
                throw err;
            }
            //запись в файл ответа сервера;
            console.log('!!!!!!!response from DB!!!!!!!!!!!', resp)
            res.end(JSON.stringify(resp))
        });

    } else if (url == '/crmadduser') {
       
        
        let datafromfront = (req) => {
            const body = [];
            req.on('data', chunk => {
                body.push(chunk);
            }).on('end', async() => {
                const data = body.join('');
                const args = JSON.parse(data);
                console.log('////// args///////', args)
                console.log('//////////////////args///////////', args.email, args.password, args.name, args.email)
                     
                const sql = `INSERT INTO crmuser VALUES ('${args.password}', '${args.name}', '${args.email}', '${args.user_id}', ${args.bill})`;
                
                console.log('sql', sql)
                // try {
                    pool.query(sql, (err, resp1) => {
                         if (err) {
                             throw err;
                        }
                     });
                     
                     
                   
                });
                 
       
        }
         datafromfront(req)
         
       
        res.writeHead(200, { 'Content-Type': 'Content-Type' });
        const user = {
            name :'User 1',
            city: 'Rome',
            proffession: 'emperor',
        }
        
        res.end(req.url)

    } else if (url == '/todoPost') {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        let datafromfront = (req) => {
           
            const body = [];
            req.on('data', chunk => {
                body.push(chunk);
            }).on('end', async() => {
                const data = body.join('');
                const args = JSON.parse(data);
                console.log('//////////////////args///////////', args.id, args.name, args.surname, args.date, args.completed)

                const sql = `INSERT INTO todo VALUES (${args.id}, '${args.name}', '${args.surname}', '${args.date}', '${args.completed}', '${args.url}')`;
               
                console.log('sql', sql)
                pool.query(sql, (err, resp2) => {
                    if (err) {
                        throw err;
                    }
                    //запись в файл ответа сервера;

                    console.log('resp2', resp2)
                        // res.end(JSON.stringify(resp))
                });
                const sql_1 = `SELECT todo_line, todo_person, todo_date FROM todo`;
                pool.query(sql_1, (err2, resp2) => {
                    if (err2) {
                        throw err2;
                    }
                    //запись в файл ответа сервера;

                    console.log('resp2', resp2)
                    res.end(JSON.stringify(resp2))
                });


            })


           
        }
        datafromfront(req)

        res.writeHead(200, { 'Content-Type': 'Content-Type' });
        res.end(req.url)
           
    } else if (url == '/todoDeletByID') {
        console.log('/url', url)
        let datafromfront = (req) => {
            const body = [];
            console.log('body', body)
            req.on('data', chunk => {
                body.push(chunk);
                console.log('body', body)
            }).on('end', async() => {
                const data = body.join('');
                const args = JSON.parse(data);
                console.log('args', args.id)

                const sql = `DELETE FROM todo WHERE todo_id=${args.id}`;

                console.log('sql', sql)
                pool.query(sql, (err, resp) => {
                    if (err) {
                        throw err;
                    }
                    console.log('resp', resp)
                        // res.end(JSON.stringify(resp))
                });

            })
        }
        datafromfront(req)
        res.writeHead(200, { 'Content-Type': 'Content-Type' });
        res.end(req.url)
    } else if (url == '/todoDeletAll') {
        
        let datafromfront = (req) => {
             

                const sql = `DELETE FROM crmuser`;

                console.log('sql', sql)
                pool.query(sql, (err, resp) => {
                    if (err) {
                        throw err;
                    }
                    console.log('resp', resp)
                        // res.end(JSON.stringify(resp))
                });

             
        }
        datafromfront(req)
        res.writeHead(200, { 'Content-Type': 'Content-Type' });
        res.end(req.url)
    }
    else {
        const { url } = req;
        const name = url === '/' ? '/index.html' : url;
        // console.log('name - ', name)

        const fileExt = path.extname(name).substring(1);
        // console.log('fileExt - ', fileExt)
        const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.html;
        // console.log('mimeType - ', mimeType)
        res.writeHead(200, { 'Content-Type': mimeType });
        const stream = serveFile(name);
        if (stream) stream.pipe(res);

    }

}).listen(8000, () => console.log('Server started on port 8000'));
