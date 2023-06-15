import { normalizeOptions, addFiles } from '@kuda-terbang/generator-utils';
import { convertNxGenerator, formatFiles, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/js';

import { name } from '../../../project.json';
import { UtilApiGeneratorSchema } from './schema';

export const utilApiGenerator = async (tree: Tree, options: UtilApiGeneratorSchema) => {
  const normalizedOptions = normalizeOptions(tree, {
    ...options,
    name: 'util-api',
  });
  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
    bundler: 'tsc',
    config: 'project',
    testEnvironment: 'node',
    publishable: true,
    importPath: `@${normalizedOptions.npmScope}/util-api`,
  });
  addFiles(tree, normalizedOptions, name, 'util-api', 'files');

  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/util-api.spec.ts'));

  await formatFiles(tree);
};

export const utilApiSchematic = convertNxGenerator(utilApiGenerator);
