# SCRIPTS

Handlers are loaded from the `server/app/scripts` directory (`/app/scripts` from within the container).

See [Github Documentation](https://docs.github.com/en/webhooks/webhook-events-and-payloads) for information on the hook events

The handlers load from folders named after the events and a sub directory for the action, if there is one. If there is no action, there should not be a sub directory. If there is actions to a an event, and there is no directory, it will load any scripts in the event folder.

> [!NOTE]
> There is a _special_ directory called `_`. This directory should have handlers that run where there is no event defined. 

![Scripts Directory](/docs/assets/image.png)

``` js
const { Octokit } = require('@octokit/rest');
const config = require('../../../config');

module.exports = (owner, repo, action, payload) => {
	console.log({ owner, repo, action, payload });

};
```
