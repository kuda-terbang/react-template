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

export function replaceContentFile({
  tree,
  options,
  path,
  fromString,
  toString,
}: {
  tree: Tree,
  options: NormalizedSchema,
  path: string,
  fromString: string,
  toString: string,
}) {
  const filePath = '/' + options.projectRoot + path
  const fileContent = tree.read(filePath)
  const fileContentString = fileContent.toString().replace(new RegExp(fromString, 'g'), toString)
  const fileContentBuffer = Buffer.from(fileContentString, "utf-8");
  tree.write(filePath, fileContentBuffer)
  logger.log(`REPLACE ${fromString} with ${toString} : ${filePath}`)
}

export function addModules({
  tree,
  options,
  modulePath,
  targetModulePath,
  replaceStrings,
}: {
  tree: Tree,
  options: NormalizedSchema,
  modulePath: string,
  targetModulePath: string
  replaceStrings?: {
    fromString: string
    toString: string
    paths: string[]
  }[]
}) {
  logger.log('GENERATE module ', modulePath)
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: ''
  };

  const sourcePath = tree.root.concat(modulePath)
  const targetPath = options.projectRoot + targetModulePath

  generateFiles(
    tree,
    sourcePath,
    targetPath,
    templateOptions,
  )

  if (replaceStrings) {
    replaceStrings.forEach((replaceString) => {
      replaceString.paths.forEach((path) => {
        replaceContentFile({
          tree,
          options,
          path,
          fromString: replaceString.fromString,
          toString: replaceString.toString,
        })
      })
    })
  }
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