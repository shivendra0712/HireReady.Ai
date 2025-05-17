const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},{
    timestamps: true,
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.generateAuthToken = async function () {
    
    const token = jwt.sign({ id: this._id }, process.env.Secret_key, {
        expiresIn: "1h",
    });

    console.log("token--->", token);

    if (!token) throw new Error("error generating token ");
    return token;
};

userSchema.statics.authenticateUser = async function (email, password) {
    const user = await this.findOne({ email });
    console.log("obj user----->", user);
    if (!user) throw new Error("User not found ");

    const isMatch =await bcrypt.compare(password, user.password);
    console.log("pass->", isMatch);
    if (!isMatch) throw new Error("incorrect email or password ");

    return user;
};

module.exports = mongoose.model('User', userSchema);