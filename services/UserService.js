const mongoDB = require("../utility/dbutils/DBConnection");
const User = require("../models/User");

module.exports = {
    saveUser: function (userObj) {
        let promise = new Promise((resolve, reject) => {
            mongoDB.connectMongoDB().then(() => {
                const user = new User(userObj);
                user.save().then(value => {
                    resolve(value);
                    mongoDB.disconnectMongoDB();
                }).catch(reason => {
                    reject(reason);
                    mongoDB.disconnectMongoDB();
                });
            }).catch(reason => {
                reject(reason);
            })
        });

        return promise;
    },
    getUserByEmail: function (email) {
        let promise = new Promise((resolve, reject) => {
            mongoDB.connectMongoDB().then(() => {
                User.findOne({ email: email }).then(value => {
                    resolve(value);
                    mongoDB.disconnectMongoDB();
                }).catch(reason => {
                    reject(reason);
                    mongoDB.disconnectMongoDB();
                });
            }).catch(reason => {
                reject(reason);
            });
        });

        return promise;
    },
    getUserByUserID: function (userID) {
        let promise = new Promise((resolve, reject) => {
            mongoDB.connectMongoDB().then(() => {
                User.findById(userID).select("-password").then(value => {
                    resolve(value);
                    mongoDB.disconnectMongoDB();
                }).catch(reason => {
                    reject(reason);
                    mongoDB.disconnectMongoDB();
                });
            }).catch(reason => {
                reject(reason);
            });
        });

        return promise;
    }
}