const { body, validationResult } = require("express-validator");
const appConstants = require("../utility/apputils/AppConstants");

const validateUser = [
    body("name")
        .trim()
        .isLength({ min: 3 })
        .withMessage(appConstants.nameMinimumLengthMsg),
    body("email")
        .trim()
        .isEmail()
        .withMessage(appConstants.inValidEmailMsg),
    body("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage(appConstants.passwordMinimumLengthMsg),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                messageType: appConstants.responseErrorMsgType,
                message: errors.array()
            });
        next();
    }
];
const validateLoginDetails = [
    body("email")
        .trim()
        .isEmail()
        .withMessage(appConstants.inValidEmailMsg),
    body("password")
        .trim()
        .isLength({ min: 1 })
        .withMessage(appConstants.passwordBlankMsg),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({
                messageType: appConstants.responseErrorMsgType,
                message: errors.array()
            });
        next();
    }
];

module.exports = { validateUser, validateLoginDetails };