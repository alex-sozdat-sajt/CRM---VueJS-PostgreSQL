const { Pool } = require("pg");
// Database settings
const pool = new Pool({
    host: '127.0.0.2',
    port: 5432,
    database: 'crm',
    user: 'postgres',
    password: 'belakt1',
});

/**
 * Query for all users.
 */
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/**!!!!!!!!!!!!!!!!!!!!!!!!!!!!ниже   запросы к БД!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

/****my  dataFromDb  results.rows*/
const dataFromDb = (request, response) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      pool.query("SELECT * FROM crmuser", (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows)
      response.status(200).json(results);
    });
  };
/**** my  dataActiveUser    */
const dataActiveUser = (request, response) => {
     
    // const user_id = parseInt(request.params.user_id);
    const user_id = request.params.user_id;

    console.log('dataActiveUserdataActiveUserdataActiveUserdataActiveUser', user_id)
    pool.query("SELECT * FROM crmuser WHERE user_id = $1", [user_id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
/**** my  setActiveUser    results.insertId*/
const setActiveUser = (request, response) => {
    const { user_id, user_status } = request.body;
  
    pool.query(
      "INSERT INTO activeuser (user_id, state) VALUES ($1, $2)",
      [user_id, user_status],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`);
        console.log(results.insertId);
      }
    );
  };

  /**** my  addUser    results.insertId*/
  const addUser = (request, response) => {
    const { name, email, password, expense, user_id, bill, } = request.body;
  console.log('!!!!!!!!', password, name, email, user_id, bill, expense)
    try{pool.query(
      `INSERT INTO crmuser VALUES ('${password}', '${name}', '${email}', '${user_id}', ${bill},'${expense}')`,
       (error, results) => {
        if (error) {
          throw error;
        }
        // response.status(200).send(`User added with ID`);
        // console.log(results);
      }
    );}catch(e){}
    const category_table = `category_${expense}`
    console.log('category_table ', `${category_table}`)
    const sql = `CREATE TABLE ${category_table}(expense_id SERIAL, expense_items varchar, expense_limit int, remains int)`
    console.log('!!!!!!!', sql)
    try{pool.query(
          sql,
        (error, results) => {
        if (error) {
          throw error;
        }
        
        // response.status(200).send(`TABLE CREATED`);
        // console.log(results);
      }
    );}catch(e){}
    const record_table = `record_${expense}`
    console.log('record_table ', `${record_table}`)
    
    const sql_r = `CREATE TABLE ${record_table}(record_id SERIAL, record_items varchar, record_type varchar, record_amount int, category_id int, record_data date)`
    console.log('!!!!!!!', sql_r)
    try{pool.query(
          sql_r,
        (error, results) => {
        if (error) {
          throw error;
        }
        
        // response.status(200).send(`TABLE CREATED`);
        // console.log(results);
      }
    );}catch(e){}
  };
    
   /**** my  deleteActiveUser    results.insertId*/
   const deleteActiveUser = (request, response) => {
    console.log('!!!!!!!!!!!!!!!!!!!deleteActiveUser!!!!!!!!!!!!!!!!!!!!!!!');
  
    pool.query("DELETE FROM activeuser", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`activeUser deleted ${results}`);
    });
  };

   /**** my  getActiveUser    results.insertId*/
   const getActiveUser = (request, response) => {
    pool.query("SELECT * FROM activeuser", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  /**** my  addCategory    results.insertId*/
  const addCategory = (request, response) => {
    console.log('!!!!!!!!!!!!!!!!!addCategory!!!!!!!!!!!!!!!!!!!');
    const { expense, title, limit} = request.body;
    console.log( expense, title, limit);
    const category_table = `category_${expense}`
    console.log( `INSERT INTO ${category_table} VALUES (DEFAULT, '${title}', ${limit})`)
    pool.query(
        `INSERT INTO ${category_table} VALUES (DEFAULT, '${title}', ${limit})`, (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`Category added `);
        console.log(results);
      }
    );
  };
  /**** my  addRecord    results.insertId*/
  const addRecord = (request, response) => {
    console.log('!!!!!!!!!!!!!!!!!addRecord!!!!!!!!!!!!!!!!!!!');
      /*(record_id SERIAL, record_items varchar, record_type varchar, record_amount int, category_id int, record_data date)`Id*/
     
    const {description, type,  amount, categoryId, date, recordTableName, DataTableName, bill, email, categoryTableName, expense_limit} = request.body;
    console.log( 'description, type,  amount, categoryId, date', description, type,  amount, categoryId, date, recordTableName, DataTableName, email);
    
    const sql_ar =   `INSERT INTO ${recordTableName} VALUES (DEFAULT, '${description}', '${type}', ${amount}, ${categoryId}, ${date})`
    console.log( 'sql_ar', sql_ar)
    
    pool.query(
      `INSERT INTO ${recordTableName} VALUES (DEFAULT,'${description}','${type}', ${amount}, ${categoryId})`, (error, results) => {
        if (error) {
          throw error;
        }
        // response.status(201).send(`Category added `);
        // console.log(results);
      }
    );//изменение остатков по счету на величину расхода/дохода
    if(type==='outcome'){
      const rebill = bill - amount;
      const re_expense_limit = expense_limit - amount;
      expense_limit
      console.log( 'rebill', rebill)
      console.log( 'bill', bill)
      console.log( 'rebill', `UPDATE crmuser SET bill = ${rebill} WHERE e_mail1='${email}'`)

      pool.query(
        `UPDATE crmuser SET bill = ${rebill} WHERE e_mail1='${email}'`, (error, results) => {
          if (error) {
            throw error;
          }
          // response.status(201).send(`Category added `);
          // console.log(results);
        }
      );
      pool.query(
        `UPDATE ${categoryTableName} SET expense_limit = ${re_expense_limit} WHERE expense_id='${categoryId}'`, (error, results) => {
          if (error) {
            throw error;
          }
          
          response.status(200).send(JSON.stringify({Category_added_rebill: rebill, re_expense_limit: re_expense_limit}));
          console.log(results);
        }
      );
    }else{
      const rebill = bill + amount;
      const re_expense_limit = expense_limit + amount;
      pool.query(
        `UPDATE crmuser SET bill = ${rebill} WHERE email1=${email}`, (error, results) => {
          if (error) {
            throw error;
          }
          // response.status(201).send(`Category added `);
          // console.log(results);
        }
      );
      pool.query(
        `UPDATE ${categoryTableName} SET expense_limit = ${re_expense_limit} WHERE expense_id='${categoryId}'`, (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).send(`Category added `);
          console.log(results);
        }
      );
    }
    
  };

   /**** my  updateCategory    results.insertId*/
   const updateCategory = (request, response) => {
    console.log('!!!!!!!!!!!!!!!!!updateCategory!!!!!!!!!!!!!!!!!!!');
       
    const {expense_idf,  expense_itemsf, expense_limitf, expense_user_tablef} = request.body;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!", expense_idf,  expense_itemsf, expense_limitf, expense_user_tablef);
    
   
    console.log(`UPDATE ${expense_user_tablef} SET expense_items = ${expense_itemsf} WHERE expense_id = ${expense_idf}`)
    pool.query(
      `UPDATE ${expense_user_tablef} SET expense_items = $1, expense_limit = $2  WHERE expense_id = $3`, [expense_itemsf, expense_limitf, expense_idf], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send('Категория обновлена')
        console.log(results);
      }
    );
  };
  /**** my  fetchCategories    results.insertId*/
  const fetchCategories = (request, response) => {
    console.log('fetchCategoriesfetchCategoriesfetchCategoriesfetchCategoriesfetchCategoriesfetchCategoriesfetchCategoriesfetchCategories'); 
    const  {table_name} = request.body;
    console.log(table_name);
    const category_table = `category_${table_name}`
    console.log('category_table fetch', category_table);
    const sql =  'SELECT * FROM '+`${category_table}`
    console.log(sql);
    pool.query(
        sql,
        (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
        console.log(results);
      }
    );
  };

 /**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/ 
/**
 * Query for a specific user by ID.
 */
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/**
 * Query for new user.
 */
const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
      console.log(results.insertId);
    }
  );
};

/**
 * Query to update user information.
 */
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

/**
 * Query to delete user by ID.
 */
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  
  dataFromDb,
  addUser,
  addRecord,
  setActiveUser,
  dataActiveUser,
  deleteActiveUser,
  getActiveUser,
  addCategory,
  updateCategory,
  fetchCategories,
};
 