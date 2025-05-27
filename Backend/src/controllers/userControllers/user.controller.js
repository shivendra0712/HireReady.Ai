const User = require('../../models/userModels/user.model.js');
const bcrypt = require('bcryptjs');
const CustomError = require('../../utils/customError.js');
const cacheClient = require('../../services/cache.services.js');

const registerController = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(new CustomError('user already exist', 409));
        const user = await User.create({
            username,
            email,
            password
        });

        const token = await user.generateAuthToken();
        console.log('token inside controller --->', token);

        res.cookie('token', token, {
      httpOnly: true,      
      secure: false,       
      sameSite: 'lax',   
    
    });

    let cookie = req.cookies;

    console.log(cookie)
    
        res.status(201).json({ message: 'User created successful', token: token });


    }
    catch (error) {
        next(new CustomError('error.message', 500));
    }

}


const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.authenticateUser(email, password);
        // console.log("user->", user);

        const token = await user.generateAuthToken();
        // console.log("this way token -> ", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite: "lax",
        });
        console.log("save cookie ")
        console.log(req.cookies)

        res.status(200).json({ message: "User Logged in", token: token });
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};


const logoutController = async (req, res, next) => {
    const { token } = req.cookies;
    try {
        if (!token) return next(new CustomError('User unauthorized', 401));

        const blocklistToken = await cacheClient.set(
            token,
            'blocklisted',
            'EX',
            3600
        );

        res.clearCookie('token');
        res.status(200).json({ message: 'user logged out ' });

    }
    catch (error) {
        next(new CustomError(error.message, 500))
    }
}


const currentUserController = async (req, res, next) => {

    try {
        const user = req.user;
        res.status(200).json({ message: 'authentication successful', user: user });
    } catch (error) {

    }
}


module.exports = { registerController, loginController, logoutController, currentUserController };