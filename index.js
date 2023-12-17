const express = require("express");
require("dotenv").config();

const database = require("./config/database")

const route = require("./routes/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT;



app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");


// Routes
route(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})