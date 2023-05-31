const createError = require('http-errors');
const User = require('../models/userModels');
const getUsers = async (req, res, next)=>{
   try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp('.*' + search + ".*", 'i');

    const filter = {
        isAdmin:{ $ne: true},
        $or:[
            {name: {$regex: searchRegExp}},
            {email: {$regex: searchRegExp}},
            {phone: {$regex: searchRegExp}}
        ]
    };

    const options = {password: 0}



    const users = await User.find(filter,options)
    .limit(limit)
    .skip((page-1)*limit)
    res.status(200).send({
        message:'User were is return',
        users,
    
    });
   } catch (error) {
        next(error);
   }
};

module.exports = {getUsers}