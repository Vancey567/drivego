const tokenService = require('../services/token-service');

module.exports = async function(req, res, next) {
    try {
        const { accessToken } = req.cookies;
        if(!accessToken) {
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        if(!userData) {
            throw new Error();
        }
        req.user = userData; // attaching userData on the request by create a key "user". So that we can access the user info inside controller
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({message: "Invalid Token"});
    }
};
