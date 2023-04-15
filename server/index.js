const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8000;
const db = require("./queries");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  // res.append('Access-Control-Allow-Origin', 'no-cors');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type', '*');
  next();
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.get("/dataFromDb", db.dataFromDb);
app.post("/crmadduser", db.addUser);
app.post("/setactiveuser", db.setActiveUser);
app.post("/dataActiveUser", db.dataActiveUser);
app.get("/deleteActiveUser", db.deleteActiveUser);
app.get("/getActiveUser", db.getActiveUser);
app.post("/addCategory", db.addCategory);
app.post("/addRecord", db.addRecord);
app.put("/updateCategory", db.updateCategory);
app.post("/fetchCategories", db.fetchCategories);



app.listen(port, () => {
  console.log(`App running on port ${port}`);
});