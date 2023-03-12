import { addProjectConfiguration, formatFiles, Tree } from '@nrwl/devkit';
import { addFiles, normalizeOptions } from '@kuda-terbang/generator-utils';
import { IconsGeneratorSchema } from './schema';
import { name } from '../../../project.json';

export default async function (tree: Tree, options: IconsGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions, name, 'icons-template', 'files');
  await formatFiles(tree);
}
