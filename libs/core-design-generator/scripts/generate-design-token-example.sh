generateCommand="npx nx generate @kuda-terbang/core-design:design-token-template design-token-example --no-interactive"
projectPath=../design-token-example

if [ ! -d $projectPath ]
then
  echo "Directory $projectPath DOES NOT exists."
else
  echo "Directory $projectPath EXISTS."
  rm -rf $projectPath
  # TODO: update workspace.json and tsconfig.base.json
fi
  eval "$generateCommand"
