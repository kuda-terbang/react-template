const {version} = require('../../package.json')

module.exports = async ({context, exec, github}) => {
	await exec.exec(`npm run release ${version} --loglevel=debug`)
}
