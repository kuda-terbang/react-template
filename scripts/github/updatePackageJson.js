const readJson = (fs, paths) => {
	return paths.map((path) => {
		const fileString = fs.readFileSync(path)
		return JSON.parse(fileString)
	})
}
const updateVersion = ({fs, version}, files) => {
	files.forEach(({json, path}) => {
		json.version = version;
		console.log(`> ${path} ${json.version} > ${version}`)
		const stringifyJson = JSON.stringify(json, null, 2);
		fs.writeFileSync(path, stringifyJson);
	})
}
module.exports = async ({exec, version}) => {
	const fs = require('fs');
	await exec.exec('git checkout develop');
  try {
		const [
			packageJson,
			packageLockJson,
			lernaJson,
		] = readJson(fs, ['./package.json', './package-lock.json', './lerna.json'])
		if (packageJson.version !== version) {
			await updateVersion({fs, version}, [
				{json: packageJson, path: './package.json'},
				{json: packageLockJson, path: './package-lock.json'},
				{json: lernaJson, path: './lerna.json'},
			])
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
