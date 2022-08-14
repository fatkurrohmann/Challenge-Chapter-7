// import express
const express = require("express");
const app = express();

// import router
const router = require("./routes/router");

// atur port
const port = 3000;

app.use(express.static("public")); 
app.use(express.urlencoded({ extended: false })); 

app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => {
    console.log("App is running in http://localhost:3000");
});
