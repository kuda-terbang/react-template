import { logger, Tree } from "@nrwl/devkit";

import { NextjsClientTemplateNormalized } from "../schema";
import { addFiles, copyFile, createPath } from '../../../utils/file-modifier'

export default function (tree: Tree, normalizedOptions: NextjsClientTemplateNormalized) {
  logger.log('START restructure for create react app')

  addFiles(tree, normalizedOptions, 'nextjs-client-template', 'cna-files')

  // Delete or update all files related to nx
  tree.delete(normalizedOptions.projectRoot.concat('/project.json'))
  tree.delete(normalizedOptions.projectRoot.concat('/jest.config.ts'))
  // Update eslintrc remove nrwl dependency
  // tree.delete(normalizedOptions.projectRoot.concat('/.eslintrc.json'))
}
