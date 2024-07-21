const mongoose=require('mongoose')

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`server Running On ${mongoose.connection.host}`);
    }catch(err){
        console.log(`${err}`);
    }
}

module.exports=connectDb