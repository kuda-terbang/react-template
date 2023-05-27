BackupDir=$(find ./src/generators/ -maxdepth 1 -type d  | awk -F/ '{print $NF}')
echo "BackupDir $BackrupDir"
for projectName in $BackupDir; do
	echo "projectName = $projectName"
	projectPath=../$projectName
	if [ ! -d $projectPath ]
	then
		echo "Directory $projectPath DOES NOT exists."
	else
		echo "Directory $projectPath EXISTS."
		rm -rf $projectPath
		# TODO: update workspace.json and tsconfig.base.json
	fi
		generateCommand="npx nx generate @kuda-terbang/core-util-generator:$projectName --no-interactive"
		echo "generateCommand = $generateCommand"
		eval "$generateCommand"
done
