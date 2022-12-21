const appConstants = require("../utility/apputils/AppConstants");
const appCommons = require("../utility/apputils/AppCommons");

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({
            messageType: appConstants.responseErrorMsgType,
            message: appConstants.inValidAuthenticationTokenMsg
        });
    }

    try {
        const data = appCommons.verifyAuthToken(token);
        req.user = data.user;

        next();
    } catch (error) {
        res.status(401).json({
            messageType: appConstants.responseErrorMsgType,
            message: appConstants.inValidAuthenticationTokenMsg
        });
    }
}

module.exports = fetchUser;