import { logger, Tree } from '@nx/devkit';
import { addFiles, deleteFileInstance } from '@kuda-terbang/generator-utils';

import { name } from '../../../../project.json';
import { NextjsClientTemplateNormalized } from '../schema';

export default function (tree: Tree, normalizedOptions: NextjsClientTemplateNormalized) {
  logger.log('START restructure for create react app');
  const deleteInstance = deleteFileInstance({ tree, normalizedOptions });

  deleteInstance('/project.json');
  deleteInstance('/tsconfig.spec.json');

  addFiles(tree, normalizedOptions, name, 'nextjs-client-template', 'cna-files');

  // Delete or update all files related to nx
  deleteInstance('/jest.config.ts');
  // Update eslintrc remove nrwl dependency
  // tree.delete(normalizedOptions.projectRoot.concat('/.eslintrc.json'))

  if (normalizedOptions.isDefaultCnaTemplate) {
    tree.delete(normalizedOptions.projectRoot.concat('/package.json'));
    addFiles(tree, normalizedOptions, name, 'nextjs-client-template', 'default-cna-files');
  }
}
