const Razorpay = require('razorpay')

const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

class PaymentController {
    async razorpayPayment(req, res) {
        const {driverId, riderId, amount} = req.body;
        
        var instance = new Razorpay({ key_id: RAZORPAY_KEY, key_secret: RAZORPAY_SECRET })

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                key1: "value3",
                key2: "value2"
            }
        }

        try {
            const order = await instance.orders.create(options);
            return res.status(201).json({success: true, order, amount});
        } catch (err) {
            console.log(err);
            return res.status(400).json({error: err})
        }

    }
}

module.exports = new PaymentController();