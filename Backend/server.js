const express = require("express");
const app = express();
const port= process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require('./routes/api/Items.js');

//bodyparser middleware
app.use(bodyParser.json());

//DB Config
const db =require('./config/keys').mongoURI;
mongoose.connect(db,{useNewUrlParser:true})
	.then(()=>console.log("MONGODB CONNECTED"))
	.catch(()=>console.log("ERROR"));

app.use("/",items)
app.listen(port,()=>console.log(`MAGIC HAPPENS ON PORT ${port} `));