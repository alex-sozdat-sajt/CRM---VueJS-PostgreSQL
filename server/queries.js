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

/**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

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
    console.log('dataActiveUserdataActiveUserdataActiveUserdataActiveUser')
    const user_id = parseInt(request.params.user_id);
  
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
    const sql = `CREATE TABLE ${expense}(expense_id SERIAL, expense_items varchar, expense_limit int, remains int)`
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
    
    
    pool.query(
        `INSERT INTO ${expense} VALUES (DEFAULT, '${title}', ${limit})`, (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`Category added `);
        console.log(results);
      }
    );
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

    const sql =  'SELECT * FROM '+`${table_name}`
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
  setActiveUser,
  dataActiveUser,
  deleteActiveUser,
  getActiveUser,
  addCategory,
  updateCategory,
  fetchCategories,
};
 