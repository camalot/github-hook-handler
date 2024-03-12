
const { Octokit } = require('@octokit/rest');
const config = require('../../../config');
const sample = require('./sample.config');

// console.log(sample.repository.created.sample);

const octokit = new Octokit({
	auth: config.github.token,
	userAgent: config.github.userAgent
});


module.exports = (owner, repo, action, payload) => {
	// console.log({ owner, repo, action, payload });

	// loop sample.repository.created.sample.teams
	// for each team, add the team to the repo with the specified permission

	sample.repository.created.sample.permissions.teams.forEach(team => {
		console.log(`adding ${team.slug} to ${repo} with ${team.permission} permissions`)
		// octokit.rest.repos.addOrUpdateRepoPermissionsInOrg({
		// 	org: owner, // owner of the repo
		// 	team_slug: team.slug,
		// 	repo: repo,
		// 	permission: team.permission,
		// });

	});
};
