const core = require('@actions/core');

const { execSync } = require('child_process');

const host = core.getInput('host');
const port = core.getInput('port');
const socketPath = core.getInput('socket-path');
const key = core.getInput('key');

console.log(`Attempting to create ${socketPath}...`);
try {
    execSync(
        'mkdir -p ~/.ssh && ' +
        `ssh-keyscan${port ? ` -p ${port}` : ''} "${host}" >> ~/.ssh/known_hosts && ` +
        `eval $(ssh-agent -a "${socketPath}") && ` +
        `echo "${key}" | base64 -d | ssh-add -`
    );
} catch (e) {
    console.error(e.message);
    process.exit(1);
}

console.log(`Created ${socketPath}`);
core.setOutput('socket-path', socketPath);

console.log('Done; exiting.');
