const userService = require("../services/UserService");
const appCommons = require("../utility/apputils/AppCommons");
const appConstants = require("../utility/apputils/AppConstants");

module.exports = {
    createUser: async function (request, response) {
        try {
            let { name, email, password } = request.body;
            let user = await userService.getUserByEmail(email);

            if (!user) {
                let hashPassword = await appCommons.generateHashPassword(password);
                let savedUser = await userService.saveUser({
                    name: name,
                    email: email,
                    password: hashPassword
                });

                let authenticationToken = appCommons.generateAuthenticationToken(savedUser.id);

                response.status(200).json({
                    messageType: appConstants.responseSuccessMsgType,
                    message: authenticationToken
                });
            }
            else {
                response.status(400).json({
                    messageType: appConstants.responseErrorMsgType,
                    message: appConstants.emailIDAlreadyExistMsg
                });
            }
        } catch (reason) {
            console.log(reason);
            response.status(500).json({
                messageType: appConstants.responseErrorMsgType,
                message: reason
            });
        }
    },
    login: async function (request, response) {
        try {
            let { email, password } = request.body;
            let user = await userService.getUserByEmail(email);

            if (!user) {
                return response.status(400).json({
                    messageType: appConstants.responseErrorMsgType,
                    message: appConstants.enterValidCredentialsMsg
                });
            }

            let isPasswordValid = await appCommons.comparePassword(password, user.password);

            if (!isPasswordValid) {
                return response.status(400).json({
                    messageType: appConstants.responseErrorMsgType,
                    message: appConstants.enterValidCredentialsMsg
                });
            }

            let authenticationToken = appCommons.generateAuthenticationToken(user.id);

            response.status(200).json({
                messageType: appConstants.responseSuccessMsgType,
                message: authenticationToken
            });
        } catch (reason) {
            console.log(reason);
            response.status(500).json({
                messageType: appConstants.responseErrorMsgType,
                message: reason
            });
        }
    },
    getUser: async function (request, response) {
        try {
            let user = await userService.getUserByUserID(request.user.id);

            response.status(200).json({
                messageType: appConstants.responseSuccessMsgType,
                message: user
            });
        } catch (reason) {
            console.log(reason);
            response.status(500).json({
                messageType: appConstants.responseErrorMsgType,
                message: reason
            });
        }
    }
}