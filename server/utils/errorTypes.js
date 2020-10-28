const AppError = require("./../utils/appError");

module.exports = (type) => {
    switch (type) {
        case "db":
            return new AppError('No data found', 404);
        case "params":
            return new AppError('Required Params are missing', 400);
        default:
            return new AppError('Internal Server Error.', 500);
    }
};