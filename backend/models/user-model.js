const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: false, unique: true },
    gender: { type: String, enum: ["male", "female", "transgender", "others"], required: false},
    dob: {type: Date, required: false},
    occupation: {type: String, required: false},
    password: { type: String, required: false},
    image: {
        type: String, 
        required: false, 
        get: (image) => {
            if(image) {
                return `${process.env.BASE_URL}${image}`;
            }
            return image;
        }
    },
    isActivated: { type: Boolean, required: false, default: false }
}, {
    timestamps: true,
    toJSON: { getters: true }
})

module.exports = mongoose.model('User', userSchema);