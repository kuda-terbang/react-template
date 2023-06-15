import { addFiles, normalizeOptions } from '@kuda-terbang/generator-utils';
import { formatFiles, Tree } from '@nx/devkit';
import { Linter } from '@nx/linter';
import { libraryGenerator } from '@nx/react';

import { name } from '../../../project.json';
import { UtilReactCommonGeneratorSchema } from './schema';

export default async function (tree: Tree, options: UtilReactCommonGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, {
    ...options,
    name: 'util-react-common',
  });
  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
    publishable: true,
    importPath: `@${normalizedOptions.npmScope}/util-react-common`,
    style: 'none',
    skipFormat: false,
    skipTsConfig: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
  });
  addFiles(tree, normalizedOptions, name, 'util-react-common', 'files');
  // Remove unused file after library generator is executed
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-react-common.spec.ts'));
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-react-common.ts'));
  await formatFiles(tree);
}
