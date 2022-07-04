import { moveFilesToNewDirectory, logger, Tree } from "@nrwl/devkit";

import { NextjsClientTemplateNormalized } from "../schema";
import { addFiles, copyFile, createPath } from '../../../utils/file-modifier'

export default function (tree: Tree, normalizedOptions: NextjsClientTemplateNormalized) {
  logger.log('START restructure for create react app')
  // TODO : will be develop later
}
