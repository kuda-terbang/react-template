module.exports = async ({context, exec, github}) => {
  console.log('> context', context);
  const semver = require('semver');
  const updatePackageJson = require('./updatePackageJson');
  console.log('> TAG_LATEST', process.env.TAG_LATEST);
  // Temporary version : get git last tag add patch
  const finalVersion = semver.inc(process.env.TAG_LATEST, 'patch');
  console.log('> finalVersion', finalVersion);
  // Commit changes package.json
	await updatePackageJson({exec, version: finalVersion})

  // Create PR
  const createdPR = await github.rest.pulls.create({
    owner: context.payload.repository.organization,
    repo: context.repo.repo,
    head: 'develop',
    base: 'main',
    title: `Release - ${finalVersion}`,
    labels: ['release'],
    body: `
    ## fix
    ## feature
    ## modify
    ## breaking
    `,
  });
  console.log('> createdPR', createdPR);
  return createdPR;
};
