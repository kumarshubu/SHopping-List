const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path =require("path");
const items = require('./routes/api/Items.js');

//bodyparser middleware
app.use(bodyParser.json());

//DB Config
const db =require('./config/keys').mongoURI;
mongoose.connect(process.env.MONGODB_URI || db,{useNewUrlParser:true})
	.then(()=>console.log("MONGODB CONNECTED"))
	.catch(()=>console.log("ERROR"));

app.use("/",items)

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
 //Set static folder
 app.use(express.static('../Client/build'));

 app.get('*',(req,res)=>{
 	//first require path then...
 	res.sendFile(path.resolve(__dirname,'../Client','build','index.html'));
 });
}

const port= process.env.PORT || 5000;
app.listen(port,()=>console.log(`MAGIC HAPPENS ON PORT ${port} `));