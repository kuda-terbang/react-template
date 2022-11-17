import { moveFilesToNewDirectory, logger, Tree } from "@nrwl/devkit";

import { NormalizedReactDashboardSchema } from "../schema";
import { addFiles, copyFile, createPath } from '../../../utils/file-modifier'

export default function (tree: Tree, normalizedOptions: NormalizedReactDashboardSchema) {
  logger.log('START restructure for create react app')
  moveFilesToNewDirectory(
    tree,
    normalizedOptions.projectRoot,
    normalizedOptions.projectRoot.concat('/template'),
  )
  addFiles(tree, normalizedOptions, 'react-dashboard-template', 'cra-files');

  // Move index.html to public
  ['index.html', 'favicon.ico'].forEach((publicFile) => {
    const pathPublicFile = '/' + normalizedOptions.projectRoot.concat(`/template/src/${publicFile}`)
    const newPath = normalizedOptions.projectRoot.concat(`/template/public/${publicFile}`)
    copyFile(tree, pathPublicFile, newPath)
  })

  // Rename main.tsx to index.tsx
  logger.log('MODIFY Rename main.tsx to index.tsx')
  const { oldPath, newPath } = createPath(normalizedOptions, '/template/src/main.tsx', '/template/src/index.tsx')
  copyFile(
    tree,
    oldPath,
    newPath,
  )

  // Delete .browserlistrc as may conflict with create-react-app configuration in package.json
  logger.log('DELETE .browserlistrc')
  tree.delete(normalizedOptions.projectRoot.concat('/template/.browserslistrc'))
  
  // Delete nx related file
  logger.log('DELETE nx related file')
  tree.delete(normalizedOptions.projectRoot.concat('/template/.eslintrc.json'))
  tree.delete(normalizedOptions.projectRoot.concat('/template/.babelrc'))
  tree.delete(normalizedOptions.projectRoot.concat('/template/tsconfig.app.json'))
  tree.delete(normalizedOptions.projectRoot.concat('/template/tsconfig.spec.json'))
  tree.delete(normalizedOptions.projectRoot.concat('/template/project.json'))
  tree.delete(normalizedOptions.projectRoot.concat('/template/src/app/nx-welcome.tsx'))
}
