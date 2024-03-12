"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require("morgan");
// const favicon = require("serve-favicon");
const config = require('./config');
const webhookHandler = require('./libs/webhook/handler');
// const hooks = require('./_webhook');
const app = express();

// const passport = require("passport");
// const OAuth2Strategy = require("passport-oauth2").Strategy;
const server = require('http').Server(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
// require("./lib/hbs/xif");
// require("./lib/hbs/sections");
// require("./lib/hbs/partials");

// app.use(favicon(path.join(__dirname, "assets/images", "bit13-16.png")));

app.use(
	session({
		secret: "aikfef93ja032~39@ajdsrdrbftrt4ghtrkql23",
		resave: true,
		saveUninitialized: true
	})
);
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(webhookHandler);

app.use(cookieParser());

// webhookHandler.on('*', function (event, repo, data) {
// });

// webhookHandler.on('error', function (err, req, res) {
// 	console.log(err);
// });

webhookHandler(app);

// app.use(passport.initialize());
// app.use(passport.session()); // passport session middleware

// passport.use(new OAuth2Strategy({
// 	authorizationURL: 'https://api.nightbot.tv/oauth2/authorize',
// 	tokenURL: 'https://api.nightbot.tv/oauth2/token',
// 	clientID: config.nightbot.client_id,
// 	clientSecret: config.nightbot.client_secret,
// 	callbackURL: `http${config.isProduction ? "s" : ''}://${config.isProduction ? config.site.hostName : "localhost:3000"}/auth/nightbot/callback`,
// 	scope: 'commands commands_default'
// },
// 	function (accessToken, refreshToken, profile, done) {
// 		console.log({ token: accessToken });
// 		return done(null, { token: accessToken });
// 	}
// ));

// passport.serializeUser((user, done) => {
// 	return done(null, user);
// });

// passport.deserializeUser((user, done) => {
// 	return done(null, user);
// });


// app.use(require('./lib/middleware/user'));



app.use("/assets", express.static(path.join(__dirname, "assets")));

require("./routes")(app);

// 404 error handler
// app.use(
// 	require('./lib/express/handlers/FileNotFoundHandler')("Page Not Found", 404)
// );

// 500 error handler
// app.use(
// 	require('./lib/express/handlers/ErrorHandler')()
// );

module.exports = { app: app, server: server };
