const express = require("express");
const app = express();
const PORT = process.env.PORT || 3080;
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

// Version Base Route
const versionRouter = require("./versions/v1/version.router");

// Error Handlers
// const AppError = require("./utils/appError");
const globalErrorController = require("./utils/errorController");

//apm

const tracer = require("dd-trace").init({
    analytics: true,
});

// Compressing Response of js files to gzip format
app.use(compression());

if (process.env.NODE_ENV === "dev") {
    const fs = require("fs");
    let data = "# https://www.robotstxt.org/robotstxt.html\n" + "User-agent: *\n" + "Disallow: /";
    fs.writeFile("./../client/public/robots.txt", data, (err) => {});

    // Request Logs with Morgan
    app.use(morgan('dev'));
} else {
    const fs = require("fs");
    let data = "# https://www.robotstxt.org/robotstxt.html\n" + "User-agent: *";
    fs.writeFile("./../client/public/robots.txt", data, (err) => {});
}

const APP_URL = path.resolve(__dirname, "../client/build");
const APP_URL_HOME = path.resolve(__dirname, "../client/build/index.html");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors());

app.use("/api/", versionRouter);
app.use(express.static(APP_URL));
app.enable("trust proxy");

// Global route handler
app.get("*", async (req, res) => {
    res.sendFile(APP_URL_HOME);
});

// 404 Route Handler
// app.all('*', (req, res, next) => {
//     next(new AppError(`Route ${req.originalUrl} is not available!`, 404));
// });

// Global Error Handling Middleware
app.use(globalErrorController);

app.listen(PORT, () => {
    console.log("Log in service is listening at PORT ", PORT);
});
