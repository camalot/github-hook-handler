"use strict";

const config = require('../../config');
const fs = require("fs");
const path = require("path");
const normalizedPath = path.join(__dirname, "../../scripts");

module.exports = (app) => {
	const GithubWebHook = require('express-github-webhook');
	const webhookHandler = GithubWebHook({ path: config.github.callback.path, secret: config.github.webhook_secret });

	app.use(webhookHandler);

	// get the user's scripts from the app/scripts folder and store based on the event and action

	let scripts = {};
	let _processPath = p => {
		fs.readdirSync(p).forEach(file => {
			try {
				let configMatch = /.*?\.config\.js/i;
				let jsMatch = /.*?\.js$/i;
				let deepPath = p.substring(normalizedPath.length).replace(/\\/g, "/");
				let fullPath = path.join(p, file);
				if (fs.lstatSync(fullPath).isDirectory()) {
					_processPath(fullPath);
				} else {
					if (
						file !== "index.js" &&
						file !== "config.js" &&
						file !== "sample.config.js" && // ingore sample config files
						file !== "sample.js" && // ingore sample files
						!configMatch.test(file) &&
						jsMatch.test(file)
					) {
						let name = file.substring(0, file.lastIndexOf("."));
						let p1 = deepPath.length > 0 ? `${deepPath}/` : "";
						console.log(path.join("../../scripts", p1, name));
						if (!scripts[`${p1}`]) {
							scripts[`${p1}`] = {};
						}
						console.log(`adding script: ${name}`)
						let x = require(`../../scripts/${p1}/${name}`);
						console.log(x);
						scripts[p1][name] = x;
					}
				}
			} catch (ex) {
				console.error(ex);
			}
		});
	};
	_processPath (normalizedPath);

	console.log("initializing webhook handler for '*'");
	webhookHandler.on('*', function (event, repo, data) {
		console.log(event);
		// console.log(repo);
		// console.log(data);

		let action = data.action || "";
		console.log(action);
		let owner = null;

		console.log(`looking for /${event}/${action}/`);
		let loaded = scripts[`/${event}/${action}/`] || scripts[`/${event}/`] || scripts["/_/"];
		for (let script in loaded) {
			let func = loaded[script];
			console.log(`running script: ${event}.${action}.${script}`)
			// here we pass off to the user supplied scripts to handle the event
			func(owner, repo, action, data);
		}
	});

	webhookHandler.on('error', function (err, req, res) {
		console.log(err);
	});
}
