const jwt = require('jsonwebtoken');
const refreshModel = require('../models/refresh-model');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const resetTokenSecret = process.env.JWT_RESET_TOKEN_SECRET;
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: '1m',
        });

        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y',
        });
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        
        return { accessToken, refreshToken };
    }

    generateResetToken(payload) {
        const resetToken = jwt.sign(payload, resetTokenSecret, {
            expiresIn: '1h',
        })
        return resetToken;
    }

    async storeRefreshToken(token, userId) {
        try {
            await refreshModel.create({ 
                token,
                userId,
            });
        } catch (err) {
            console.log("Error While Storing Refresh Token")
            console.log(err.message);
        }
    }

    async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret);
    }

    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, refreshTokenSecret); 
    }

    async findRefreshToken(userId, refreshToken) {
        return await refreshModel.findOne({ 
            userId: userId, 
            token: refreshToken,
        });
    }

    async updateRefreshToken(userId, refreshToken) {
        return await refreshModel.updateOne(
            { userId: userId },
            { token: refreshToken }
        );
    }

    async removeToken(refreshToken) {
        return await refreshModel.deleteOne({ token: refreshToken }); 
    }
}

module.exports = new TokenService();
