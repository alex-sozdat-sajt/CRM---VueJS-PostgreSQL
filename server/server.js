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
    switch (url) {
        case "/dataFromDb":
					console.log('!!!!!!!req 0 !!!!!!!!!!!')
            const sql = `SELECT * FROM crmuser`;
            pool.query(sql, (err, resp) => {
                if (err) {
                    throw err;
                }
                console.log('!!!!!!!response from DB!!!!!!!!!!!', resp)
                res.end(JSON.stringify(resp))
            });
          break;
        case "/crmadduser":
					console.log('!!!!!!!req 2 !!!!!!!!!!!')
            let datafromfront = (req) => {
                const body = [];
                req.on('data', chunk => {
                    body.push(chunk);
                }).on('end', async() => {
                    const data = body.join('');
                    const args = JSON.parse(data);
                    console.log('////// args///////', args)
                    console.log('//////////////////args///////////', args.email, args.password, args.name)
                    const sql = `INSERT INTO crmuser VALUES ('${args.password}', '${args.name}', '${args.email}', '${args.user_id}', ${args.bill},'${args.expense}')`;
										const tableName =`${args.expense}`
										console.log('tableName', tableName)
                    const sql_cr = `CREATE TABLE ${tableName}(expense_id serial, expense_items varchar, expense_limit int, remains int);`
										console.log('sql', sql)
										console.log('sql_cr', sql_cr)
										 
                        pool.query(sql, (err, resp1) => {
                             if (err) {
                                 throw err;
                            }
                         });
												pool.query(sql_cr, (err, resp1) => {
														if (err) {
																throw err;
													 }
												});

												
                    });
            }
             datafromfront(req)
            res.writeHead(200, { 'Content-Type': 'Content-Type' });
            res.end(req.url)
          break;
        case "/setactiveuser":
					console.log('////// setactiveuser///////')
        let datafromfront1 = (req) => {
            const body = [];
            req.on('data', chunk => {
                body.push(chunk);
            }).on('end', async() => {
                const data = body.join('');
                const args = JSON.parse(data);
                console.log('////// args///////', args)
                const sql = `INSERT INTO activeuser VALUES ('${args.user_id}', '${args.user_status}')`;
               console.log('sql', sql)
                // try {
                    pool.query(sql, (err, resp1) => {
                         if (err) {
                             throw err;
                        }
                     });
                });
        }
         datafromfront1(req)
        res.writeHead(200, { 'Content-Type': 'Content-Type' });
        res.end(req.url)
         break;
        case "/dataActiveUser":
            console.log('dataActiveUserdataActiveUserdataActiveUserdataActiveUser')
        
                let datafromfront2 = function(req){
                    
                     const sql = `SELECT * FROM crmuser WHERE user_id = '1@mail.ru3sdf'`;
                     console.log('sql.', sql)  
                      
                    //  console.log('req.body',req.body)  
                    pool.query(sql, (err, resp1) => {
                         if (err) {
                              throw err;
                         }
                    console.log('resp1', resp1)  
                    
                     res.end(JSON.stringify(resp1.rows))
                    // res.end(resp1) 
                    //  const dataActiveUser_resp = resp1
                        return resp1
                     });
                     return  
                }
                 datafromfront2(req)
             
          break;
        case "/deleteActiveUser":
            console.log('deleteActiveUserdeleteActiveUserdeleteActiveUserdeleteActiveUser')
        let datafromfront3 = (req) => {
                const sql = `DELETE FROM activeuser`;
                console.log('sql', sql)
                pool.query(sql, (err, resp) => {
                    if (err) {
                        throw err;
                    }
                    console.log('resp', resp)
                        // res.end(JSON.stringify(resp))
                });
        }
        datafromfront3(req)
        res.writeHead(200, { 'Content-Type': 'Content-Type' });
        res.end(req.url)
            break;
        case "/getActiveUser":
          console.log('getActiveUsergetActiveUsergetActiveUsergetActiveUser')
         
                const sql_4 = `SELECT * FROM activeuser`;
                console.log('sql', sql_4)
                pool.query(sql_4, (err, resp) => {
                    if (err) {
                        throw err;
                    }
                    console.log('resp', resp)
										res.writeHead(200, { 'Content-Type': 'Content-Type' });
        res.end(JSON.stringify(resp.rows))
                });
          break;
        case "/addCategory":
            let datafromfront4 = (req) => {
            const body = [];
            req.on('data', chunk => {
                body.push(chunk);
            }).on('end', async() => {
                const data = body.join('');
                const args = JSON.parse(data);
                console.log('////// args///////', args)
                const sql = `INSERT INTO ${args.expense} VALUES (1,'${args.title}', ${args.limit})`;
               console.log('sql', sql)
                // try {
                    pool.query(sql, (err, resp1) => {
                         if (err) {
                             throw err;
                        }
                     });
                });
        }
         datafromfront4(req)
        res.writeHead(200, { 'Content-Type': 'Content-Type' });
        res.end(req.url)
          break;
         case "/fetchCategories":
            // datafromfront5(req) 
			 		function datafromfront5(req){
						console.log('//////  0 ///////')	
            const body = [];
         
            req.on('data', chunk => {
							console.log('////// 1 ///////')	
                body.push(chunk);
            }).on('end', async() => {
							console.log('////// 2 ///////')	
                const data = body.join('');
                const args = JSON.parse(data);
                console.log('////// args///////', args)
								const sql = 'SELECT * FROM ' +`${args}`
                console.log('sql', sql)
								console.log('////// 3 ///////')	
                   try{  pool.query(sql, (err, resp1) => {
                         if (err) { throw err;}
													console.log('resp1', resp1)	
                                            // global.resp1=resp1;
                                            res.write(JSON.stringify(resp1))
                                            // funcresend(resp1)
                      })
										}catch(err){console.log('ERROR', err)	} 
                });
         }
          
			console.log('////// 4 ///////')
            //  function funcresend(resp1){res.end(JSON.stringify(resp1))}
            // setTimeout(res.end(JSON.stringify(global.resp1)), 10000);
        // res.end(JSON.stringify(resp1))
         break;
				 
					  case "Papayas":
                console.log("Mangoes and papayas are $2.79 a pound.");
          break;
					  case "Papayas":
                console.log("Mangoes and papayas are $2.79 a pound.");
          break;
              
        default:
          console.log(`Sorry, we are out of.`);
	}
	console.log('////// 5 ///////')
    res.end(datafromfront5(req))
}).listen(8000, () => console.log('Server started on port 8000'));
