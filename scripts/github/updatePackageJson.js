module.exports = async ({exec, version}) => {
	const fs = require('fs');
	await exec.exec('git checkout develop');
  try {
    const packageJsonString = fs.readFileSync('./package.json');
    const packageLockJsonString = fs.readFileSync('./package-lock.json');
    const packageJson = JSON.parse(packageJsonString);
    const packageLockJson = JSON.parse(packageLockJsonString);
		if (packageJson.version !== version) {
			console.log('> first version');
			console.log('> - package.json', packageJson.version);
			console.log('> - package-lock.json', packageLockJson.version);
			packageJson.version = version;
			packageLockJson.version = version;
			const stringifyPackageJson = JSON.stringify(packageJson, null, 2);
			const stringifyPackageLockJson = JSON.stringify(packageLockJson, null, 2);
			console.log('> second version');
			console.log('> - package.json', stringifyPackageJson);
			console.log('> - package-lock.json', stringifyPackageLockJson);
			fs.writeFileSync('./package.json', stringifyPackageJson);
			fs.writeFileSync('./package-lock.json', stringifyPackageLockJson);
		} else {
			console.log('> skip update version, current version ', packageJson.version)
		}
  } catch (err) {
    console.log(err);
  }
  await exec.exec('git add .');
  await exec.exec('git', [
    'commit',
    '-m',
    "'[MODIFY] patch version package.json to start new pull request release'",
  ]);
  await exec.exec('git push');
}
