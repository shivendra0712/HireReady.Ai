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

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',

        });

        let cookie = req.cookies;
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

        const token = await user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({ message: "User Logged in", token: token });
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const updateController = async (req, res, next) => {

    try {

        const { username, email } = req.body;

        if (!email || !username) {
            return next(new CustomError("Email and username are required", 400));
        }
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { username },
            { new: true }
        );

        if (!User) {
            next(new CustomError(error.message, 400));
        }

        res.status(200).json({ message: "User Updated Succefully", user: updatedUser });
    }
    catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const updateFeedbackController = async (req, res, next) => {

    try {

        const {feedback, email } = req.body;

        if (!email) {
            return next(new CustomError("Email and username are required", 400));
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { userfeedback:feedback },
            { new: true }
        );

        if (!User) {
            next(new CustomError(error.message, 400));
        }

        res.status(200).json({ message: "User Feedback Updated Succefully", user: updatedUser });
    }
    catch (error) {
        next(new CustomError(error.message, 500));
    }
};

const deleteController = async (req, res, next) => {
    try {
        
        const { email } = req.body;

        if (!email) {
            return next(new CustomError("Email is required", 400));
        }

        const deletedUser = await User.findOneAndDelete({ email }, { new: true });

        if (!deletedUser) {
            return next(new CustomError("User not found", 404));
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
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
        next(new CustomError(error.message, 500))
    }
}


module.exports = { registerController, loginController, logoutController, currentUserController, updateController,updateFeedbackController, deleteController };
