import { addFiles, normalizeOptions } from '@kuda-terbang/generator-utils';
import { formatFiles, Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { libraryGenerator } from '@nrwl/react';

import { name } from '../../../project.json';
import { UtilConfirmationGeneratorSchema } from './schema';

export default async function (tree: Tree, options: UtilConfirmationGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, {
    ...options,
    name: 'util-confirmation',
  });
  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
    publishable: true,
    importPath: `@${normalizedOptions.npmScope}/util-confirmation`,
    style: 'none',
    skipFormat: false,
    skipTsConfig: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
  });
  addFiles(tree, normalizedOptions, name, 'util-confirmation', 'files');

  // Remove unused file after library generator is executed
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-confirmation.spec.ts'));
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-confirmation.ts'));
  await formatFiles(tree);
}
