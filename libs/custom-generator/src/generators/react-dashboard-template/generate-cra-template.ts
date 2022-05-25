import { moveFilesToNewDirectory, logger, Tree, updateProjectConfiguration } from "@nrwl/devkit";

import { NormalizedSchema } from "./types";
import { addFiles, copyFile } from './util-file'

const createPath = (options: NormalizedSchema, oldPath: string, newPath: string) => ({
  newPath: options.projectRoot.concat(newPath),
  oldPath: '/' + options.projectRoot.concat(oldPath),
})

export default function (tree: Tree, normalizedOptions: NormalizedSchema) {
  logger.log('START restructure for create react app')
  // updateProjectConfiguration(
  //   tree,
  //   normalizedOptions.projectName,
  //   {

  //   }
  // )
  moveFilesToNewDirectory(
    tree,
    normalizedOptions.projectRoot,
    normalizedOptions.projectRoot.concat('/template'),
  )
  addFiles(tree, normalizedOptions, 'cra-files');

  logger.log('normalizedOptions.projectRoot', normalizedOptions.projectRoot);
  logger.log('children projectRoot', tree.children(normalizedOptions.projectRoot));
  logger.log('children projectRoot/template', tree.children(normalizedOptions.projectRoot.concat('/template/src')));

  // Move index.html to public
  ['index.html', 'favicon.ico'].forEach((publicFile) => {
    const pathPublicFile = '/' + normalizedOptions.projectRoot.concat(`/template/src/${publicFile}`)
    logger.log('pathPublicFile', pathPublicFile)
    logger.log('tree.root', tree.root)
    const newPath = normalizedOptions.projectRoot.concat(`/template/public/${publicFile}`)
    logger.log('newPath', newPath)
    copyFile(tree, pathPublicFile, newPath)
  })

  // Rename main.tsx to index.tsx
  const { oldPath, newPath } = createPath(normalizedOptions, '/template/src/main.tsx', '/template/src/index.tsx')
  copyFile(
    tree,
    oldPath,
    newPath,
  )

  // Delete .browserlistrc as may conflict with create-react-app configuration in package.json
  logger.log('DELETE .browserlistrc')
  tree.delete(normalizedOptions.projectRoot.concat('/template/.browserslistrc'))
}
