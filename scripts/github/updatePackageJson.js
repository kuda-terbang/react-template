const readJson = (fs, paths) => {
	return paths.map((path) => {
		const fileString = fs.readFileSync(path)
		const jsonParsed = JSON.parse(fileString)
		console.log(`> ${path} version ${jsonParsed.version}`)
		return jsonParsed
	})
}
const updateVersion = ({fs, version}, files) => {
	files.forEach(({json, path}) => {
		if (path.includes('package-lock')) {
			json.version = version;
			json.packages[''].version = version;
		} else {
			json.version = version;
		}
		console.log(`> ${path} ${json.version} > ${version}`)
		let stringifyJson = JSON.stringify(json, null, 2);

		stringifyJson += '\n';
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
			await exec.exec('git add .');
			await exec.exec('git', [
				'commit',
				'-m',
				`Update ${version}`,
			]);
			await exec.exec('git push');
		} else {
			console.log('> skip update version, current version ', packageJson.version)
		}
  } catch (err) {
    console.log(err);
  }
}
