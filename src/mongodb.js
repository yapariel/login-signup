const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/LoginSignup')
.then(()=>{
    console.log('Connected to database');
})
.catch(()=>{
    console.log('Error in connecting to database');
})


const LoginSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection=new mongoose.model('collection',LoginSchema);

module.exports=collection;