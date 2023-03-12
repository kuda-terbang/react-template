generateCommand="npx nx generate @kuda-terbang/core-design:icons-template icons-example --no-interactive"
projectPath=../icons-example

if [ ! -d $projectPath ]
then
  echo "Directory $projectPath DOES NOT exists."
else
  echo "Directory $projectPath EXISTS."
  rm -rf $projectPath
  # TODO: update workspace.json and tsconfig.base.json
fi
  eval "$generateCommand"
