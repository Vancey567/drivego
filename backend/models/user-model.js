const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: Number, required: true},
    gender: { type: String, enum: ["male", "female", "transgender", "others"], required: false},
    dob: {type: Date, required: false},
    occupation: {type: String, required: false},
    userImg: {
        type: String, 
        required: false, 
        get: (userImg) => {
            if(userImg) {
                return `${process.env.BASE_URL}${userImg}`;
            }
            return userImg;
        }
    },
    password: { type: String, required: false},
    isActivated: { type: Boolean, required: false, default: false }
}, {
    timestamps: true,
    toJSON: { getters: true }
})

module.exports = mongoose.model('user', userSchema);