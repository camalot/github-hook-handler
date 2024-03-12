"use strict";

module.exports = {
	github: {
		webhook: {
			secret: process.env.GH3_WEBHOOK_SECRET || ""
		},
		callback: {
			path: process.env.GH3_CALLBACK_PATH || "/webhook"
		}
	}
};
