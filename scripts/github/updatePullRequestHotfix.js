module.exports = async () => {
	const updatePackageJson = require('./updatePackageJson');
	const semver = require('semver')
	const finalVersion = semver.inc(process.env.TAG_LATEST, 'patch')
	await updatePackageJson({exec, version: finalVersion})
}
