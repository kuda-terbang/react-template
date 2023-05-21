const {version} = require('../../package.json')

module.exports = async ({context, exec, github}) => {
	exec(`npm run release ${version} --loglevel=debug`)
}
