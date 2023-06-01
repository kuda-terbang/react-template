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
  let commandVersion = 'npx lerna version';
  if (options.version) {
    commandVersion += ` ${options.version}`;
  }
  commandVersion += ' --force-publish';

  let logLevel = 'info';
  if (options.loglevel) {
    logLevel = options.loglevel;
  }
  commandVersion += ` --loglevel=${logLevel}`;
	commandVersion += ' --yes';

	try {
		console.log(`> exec version ${commandVersion}`);
		execSync(commandVersion, { stdio: 'inherit' });

		console.log('> publish build with lerna');
		execSync('npx lerna publish from-git --no-private --yes', { stdio: 'inherit' });

	} catch (error) {
		console.error(`Command execution failed: ${error.message}`);
	}
})();
