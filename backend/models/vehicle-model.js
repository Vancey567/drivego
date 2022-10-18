const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema ({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    vehicleNumber: {type: String, required: true},
    model: {type: String, required: true},
    type: {type: String, enum: ['2-wheeler', '3-wheeler', '4-wheeler', 'others'], required: true},
    capacity: {type: Number, required: true},
    color: {type: String, required: true},
    vehicleImg: {
        type: String,
        required: false,
        get: (vehicleImg) => {
            if(vehicleImg) {
                return `${process.env.BASE_URL}${vehicleImg}`;
            }
            return vehicleImg;
        }
    },
    // activated: { type: Boolean, required: false, default: false }
}, {
    timestamps: true,
    toJSON: { getters: true }
})

module.exports = mongoose.model('Vehicle', vehicleSchema);