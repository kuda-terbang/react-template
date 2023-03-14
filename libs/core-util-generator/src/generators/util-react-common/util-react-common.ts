import { addFiles, normalizeOptions } from '@kuda-terbang/generator-utils';
import { formatFiles, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/js';

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
    bundler: 'webpack',
    config: 'project',
    testEnvironment: 'node',
    publishable: true,
    importPath: `@${normalizedOptions.npmScope}/util-react-common`,
  });
  addFiles(tree, normalizedOptions, name, 'util-react-common', 'files');
  // Remove unused file after library generator is executed
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-react-common.spec.ts'));
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-react-common.ts'));
  await formatFiles(tree);
}
