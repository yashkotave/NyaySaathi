const userModel = require('../models/userModel');


module.exports.createUser = async({
    username,email,password
}) =>{
    if(!username || !email || !password){
        throw new Error('All field are required');
    }

    const user = userModel.create({
        username,
        email,
        password
    })

    return user;
}