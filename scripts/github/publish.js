const {version} = require('../../package.json')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async () => {
	try {
    const { stdout, stderr } = await exec(`npm run release ${version} --loglevel=debug`);
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
