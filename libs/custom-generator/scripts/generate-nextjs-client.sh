craType="$1"
echo "Cra Type : $craType"

# Add options CRA template
isCnaProps=""
skipWorkpaceJson=""
if [ $craType == "template" ];
then
  echo "Add isCnaTemplate and skipWorkspaceJson"
  isCnaProps="--isCnaTemplate"
  skipWorkpaceJson="--skipWorkspaceJson"
fi
echo ""

# Debug
debug=""
if [ $debug == "true" ];
then
  echo "Mode Debug"
  debug="--dry-run"
fi
echo ""

projectName="nextjs-client-$craType"
generateCommand="npx nx generate @kudaterbang/custom-generator:nextjs-client-template $projectName --style=styled-components $skipWorkpaceJson --e2eTestRunner=none --designSystemProject=ui-mui-react-example --designTokenProject=design-token-example $isCnaProps --no-interactive $debug"

projectPath=../../apps/$projectName
echo "Project Path : $projectPath"
echo "Run : $generateCommand"
echo ""

if [ ! -d $projectPath ] 
then
  echo "Directory $projectPath DOES NOT exists."
  eval "$generateCommand"
else
  echo "Directory $projectPath EXISTS."
  rm -rf $projectPath
  # TODO: update workspace.json and tsconfig.base.json
  eval "$generateCommand"
fi
