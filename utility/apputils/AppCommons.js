const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    generateHashPassword: (password) => {
        let promise = new Promise((resolve, reject) => {
            bcrypt.genSalt(10).then(salt => {
                bcrypt.hash(password, salt).then(hashPwd => {
                    resolve(hashPwd);
                }).catch(reason => {
                    reject(reason);
                })
            }).catch(reason => {
                reject(reason);
            })
        });

        return promise;
    },
    comparePassword: (enteredPassword, hashPassword) => {
        return bcrypt.compare(enteredPassword, hashPassword);
    },
    generateAuthenticationToken: (userID) => {
        let authenticationToken = jwt.sign({
            user: {
                id: userID
            }
        }, process.env.JWT_SECRET_KEY);

        return authenticationToken;
    },
    verifyAuthToken: (authToken) => {
        return jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    }
}

