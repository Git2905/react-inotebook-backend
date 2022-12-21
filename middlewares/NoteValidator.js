const { body, validationResult } = require("express-validator");
const appConstants = require("../utility/apputils/AppConstants");

const validateNote = [
    body("title")
        .trim()
        .isLength({ min: 3 })
        .withMessage(appConstants.titleMinimumLengthMsg),
    body("description")
        .trim()
        .isLength({ min: 5 })
        .withMessage(appConstants.descriptionMinimumLengthMsg),
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

module.exports = validateNote;