const mongoose= require ("mongoose");
mongoose.connect("mongodb+srv://apoorvagarg:Apoorva@dashboard.x938wcw.mongodb.net/",{useUnifiedTopology:true,useNewUrlParser:true});
mongoose.connection.on("connected",()=>{
    console.log("mongoDb Connected successfully!!");
});

mongoose.connection.on("error",()=>{
    console.log("error in connection");
});
module.exports=mongoose;



