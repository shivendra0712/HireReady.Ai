const jwt = require('jsonwebtoken');
const User = require('../models/userModels/user.model.js');
const CustomError = require('../utils/customError.js')
const cacheClient = require('../services/cache.services.js')


const authMiddleware = async (req,res,next)=>{
    let {token} = req.cookies;
    console.log("token h : ", token)

    try{
        if(!token) return next(new CustomError('Unauthorized user!',401));
        
        const isBlacklistToken = await cacheClient.get(token);
        if(isBlacklistToken){
            return res.status(401).json({message:"token blacklisted"});
        }

        const decode = jwt.verify(token ,process.env.Secret_key);
        console.log('decoded ---->', decode);
        
        const user = await User.findById(decode.id);

        if(!user) return next(new CustomError('user not found',401));

        req.user = user;
        next();

    } catch(error){
        next(new CustomError(error.message , 500));
    }
};

module.exports = authMiddleware;
