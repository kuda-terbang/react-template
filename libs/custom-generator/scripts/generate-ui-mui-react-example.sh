generateCommand="npx nx generate @kuda-terbang/custom-generator:ui-mui-react-component ui-mui-react-example --style=styled-components --designTokenProject=design-token-example --no-interactive "
projectPath=../ui-mui-react-example

if [ ! -d $projectPath ] 
then
  echo "Directory $projectPath DOES NOT exists." 
else
  echo "Directory $projectPath EXISTS."
  rm -rf $projectPath
  # TODO: update workspace.json and tsconfig.base.json
fi
  eval "$generateCommand"