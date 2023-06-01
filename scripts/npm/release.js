const { execSync } = require('child_process');
const yargs = require('yargs');

const parseArgs = () => {
  const parsedArgs = yargs(process.argv.slice(2))
    .scriptName('npm run release')
    .wrap(144)
    .strictOptions()
    .version(false)
    .command('$0 [version]', 'This script is for publishing Nx both locally and publically')
    .option('skipPublish', {
      type: 'boolean',
      description: 'Skips the actual publishing for testing out versioning',
    })
    .option('clearLocalRegistry', {
      type: 'boolean',
      description:
        'Clear existing versions in the local registry so that you can republish the same version',
      default: true,
    })
    .option('local', {
      type: 'boolean',
      description: 'Publish Nx locally, not to actual NPM',
      alias: 'l',
      default: true,
    })
    .option('force', {
      type: 'boolean',
      description: "Don't use this unless you really know what it does",
      hidden: true,
    })
    .positional('version', {
      type: 'string',
      description: 'The version to publish. This does not need to be passed and can be inferred.',
    })
    .option('gitRemote', {
      type: 'string',
      description: 'Alternate git remote name to publish tags to (useful for testing changelog)',
      default: 'origin',
    })
    .option('loglevel', {
      type: 'string',
      description: 'Log Level',
      choices: ['error', 'info', 'debug'],
    })
    .example(
      '$0',
      `By default, this will locally publish a minor version bump as latest. Great for local development. Most developers should only need this.`
    )
    .example(
      '$0 --local false 2.3.4-beta.0',
      `This will really publish a new version to npm as next.`
    )
    .example(
      '$0 --local false 2.3.4',
      `Given the current latest major version on npm is 2, this will really publish a new version to npm as latest.`
    )
    .example(
      '$0 --local false 1.3.4-beta.0',
      `Given the current latest major version on npm is 2, this will really publish a new version to npm as previous.`
    )
    .group(['local', 'clearLocalRegistry'], 'Local Publishing Options for most developers')
    .group(['gitRemote', 'force'], 'Real Publishing Options for actually publishing to NPM')
    .parseSync();

  parsedArgs.tag ??= parsedArgs.local ? 'latest' : 'next';

  return parsedArgs;
};

(async () => {
  const options = parseArgs();

  console.log('> versioning build with lerna');
  let commandVersion = 'npx lerna version';
  if (options.version) {
    commandVersion += ` ${options.version}`;
  }
  commandVersion += ` --no-changelog --exact --force-publish --conventional-commits --create-release=github --message='chore(misc): publish %v' ${options.preid ? '--preid=' : ''}`;

  if (options.tag) {
    commandVersion += ' --conventional-prerelease';
  }
  if (options.gitRemote) {
    commandVersion += ` --git-remote=${options.gitRemote}`;
  }

  let logLevel = 'info';
  if (options.loglevel) {
    logLevel = options.loglevel;
  }
  commandVersion += ` --loglevel=${logLevel}`;
	commandVersion += ' --yes';

  console.log(`> exec version ${commandVersion}`);
	execSync(commandVersion, { stdio: 'inherit' });

  console.log('> publish build with lerna');
  execSync('npx lerna publish from-package --no-private --yes', { stdio: 'inherit' });
})();
