import { normalizeOptions, addFiles } from '@kuda-terbang/generator-utils';
import { formatFiles, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/js';

import { name } from '../../../project.json';
import { UtilApiGeneratorSchema } from './schema';

export default async function (tree: Tree, options: UtilApiGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, {
    ...options,
    name: 'util-api',
  });
  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
    bundler: 'webpack',
    config: 'project',
    testEnvironment: 'node',
    publishable: true,
    importPath: `@${normalizedOptions.npmScope}/util-api`,
  });
  addFiles(tree, normalizedOptions, name, 'util-api', 'files');

  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-api.spec.ts'));

  await formatFiles(tree);
}
