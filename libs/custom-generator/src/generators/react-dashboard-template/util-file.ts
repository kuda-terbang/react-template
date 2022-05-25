import {
  generateFiles,
  logger,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';

import type { NormalizedSchema } from './types'

export function addFiles(tree: Tree, options: NormalizedSchema, directoryName: string) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: ''
  };
  generateFiles(tree, path.join(__dirname, directoryName), options.projectRoot, templateOptions);
}

export function copyFile(tree: Tree, oldPath: string, newPath: string) {
  
  logger.log('READ ', oldPath)
  const readPublicFile = tree.read(oldPath)
  logger.log('CONTENT ', readPublicFile)
  tree.write(newPath, readPublicFile)
  logger.log('WRITE ', newPath)
  tree.delete(oldPath)
  logger.log('DELETE ', oldPath)
  logger.log('')
}