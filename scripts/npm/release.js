const { execSync } = require('child_process');
const yargs = require('yargs');

const parseArgs = () => {
  const parsedArgs = yargs(process.argv.slice(2))
    .scriptName('npm run release')
    .wrap(144)
    .strictOptions()
    .version(false)
    .command('$0 [version]', 'This script is for publishing Nx both locally and publically')
    .positional('version', {
      type: 'string',
      description: 'The version to publish. This does not need to be passed and can be inferred.',
    })
    .option('loglevel', {
      type: 'string',
      description: 'Log Level',
      choices: ['error', 'info', 'debug'],
    })
    .parseSync();

  parsedArgs.tag ??= parsedArgs.local ? 'latest' : 'next';

  return parsedArgs;
};

(async () => {
  const options = parseArgs();

  console.log('> versioning build with lerna');
  let commanPublish = 'npx lerna publish --no-private';
  if (options.version) {
    commanPublish += ` ${options.version}`;
  }
  commanPublish += ' --force-publish';

  let logLevel = 'info';
  if (options.loglevel) {
    logLevel = options.loglevel;
  }
  commanPublish += ` --loglevel=${logLevel}`;
	commanPublish += ' --yes';

	try {
		console.log('> NPM_TOKEN exist: ', !!process.env.NPM_TOKEN)
		console.log('> GITHUB_TOKEN exist: ', !!process.env.GITHUB_TOKEN)
		execSync('npm whoami', { stdio: 'inherit' });
		console.log(`> NPM config Registry`);
		execSync('npm config get registry', { stdio: 'inherit' });
		console.log(`> exec lerna publish : ${commanPublish}`);
		execSync(commanPublish, { stdio: 'inherit' });

		console.log('> last git tag :')
		execSync('git tag --sort=committerdate | tail -1', { stdio: 'inherit' })

	} catch (error) {
		console.error(`Command execution failed: ${error.message}`);
	}
})();
