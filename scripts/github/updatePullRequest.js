function generateBodyPR(pullRequestsDevelopMerged) {
  const semver = require('semver');

  // Generate and update pull request body
  const mappedTitle = str => {
    const prefix = str.split('-')[0].trim().toLowerCase();
    return {
      prType: prefix,
      title: str,
    };
  };
  let body = '';
  const titles = pullRequestsDevelopMerged.map(item => ({
    ...mappedTitle(item.title),
    url: item.url,
  }));
  console.log('> titles', titles);
  const listTypes = ['fix', 'feature', 'modify', 'breaking'];
  const mappingType = {
    fix: 'patch',
    feature: 'minor',
    modify: 'minor',
    breaking: 'major',
  };
  console.log('> listTypes', listTypes);
  let releaseType = mappingType.fix;
  listTypes.forEach(prType => {
    console.log('> prType', prType);
    body += `\n## ${prType}`;
    const titleTypes = titles.filter(title => title.prType === prType);
    titleTypes.forEach(titleType => {
      releaseType = mappingType[titleType.prType];
      body += `\n - ${titleType.title} [url](${titleType.url})`;
    });
  });
  const finalVersion = semver.inc(process.env.TAG_LATEST, releaseType);
  console.log('> finalVersion', finalVersion);
  console.log('> releaseType', releaseType);
  console.log('> body', body);
  return {
    body,
    finalVersion,
  };
}

const getPullRequstRelease = async ({github, context, lastTagReleaseDate}) => github.rest.issues.listForRepo({
	owner: context.organization.login,
	repo: context.repo.repo,
	state: 'closed',
	labels: ['QAPassed', 'dev'],
	sort: 'updated',
	since: lastTagReleaseDate,
});

module.exports = async ({context, exec, github}) => {
	const createPullRequest = require('./createPullRequest');
  // get list of merged PR to develop since last git tag
  const lastTagReleaseDate = new Date(
    Number(process.env.TAG_LATEST_DATE) * 1000,
  ).toISOString();
  console.log('> lastTagReleaseDate', lastTagReleaseDate);

	let pullRequestsDevelopMerged
	try {
		pullRequestsDevelopMerged = await getPullRequstRelease({context, github, lastTagReleaseDate})
	} catch (error) {
		pullRequestsDevelopMerged = null
	}
  console.log('> pullRequestsDevelopMerged', pullRequestsDevelopMerged);

	if (!pullRequestsDevelopMerged) {
		await createPullRequest({context, exec, github})
		pullRequestsDevelopMerged = await getPullRequstRelease({context, github, lastTagReleaseDate})
		console.log('> pullRequestsDevelopMerged after create PR', pullRequestsDevelopMerged);
	}

  // generate body
  const {body, finalVersion} = generateBodyPR(pullRequestsDevelopMerged.data);

  // Get Pull Request Release
  const pullRequestsReleases = await github.rest.pulls.list({
    owner: context.actor,
    repo: context.repo.repo,
    state: 'open',
    base: 'main',
    sort: 'updated',
  });
  console.log('> pullRequestsReleases', pullRequestsReleases);

  // Update
  await github.rest.pulls.update({
    owner: context.actor,
    repo: context.repo.repo,
    pull_number: pullRequestsReleases.data[0].number,
    title: `Release - ${finalVersion}`,
    labels: ['release'],
    body,
  });
};
