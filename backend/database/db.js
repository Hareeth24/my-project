import mongoose from 'mongoose';
import mongoo from 'mongoose';

export const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            DbName:"socialMedia"
        });
        console.log("Connected to MongoDb")
        
    }catch(error){
        console.log(error);
    }
}