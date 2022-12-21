const mongoose = require("mongoose");
const appConstants = require("../apputils/AppConstants");

module.exports = {
    connectMongoDB: () => {
        let promise = new Promise((resolve, reject) => {
            mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
                console.log(appConstants.connectedSuccessfullyToMongoDBMsg);
                resolve(true);
            }).catch(reason => {
                console.log(appConstants.connectionErrorMsg, reason);
                reject(false);
            })
        });

        return promise;
    },
    disconnectMongoDB: () => {
        mongoose.connection.close(() => {
            console.log(appConstants.disconnectedSuccessfullyFromMongoDBMsg);
        })
    }
}



