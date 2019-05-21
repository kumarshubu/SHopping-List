const mongoose =require("mongoose");
const schema=mongoose.Schema;

//create scheema
const User = new schema({
	name:{
		type:String,
		required:true
	},
	id:{
		type:Number
	}
});
module.exports=Item=mongoose.model('item',User);