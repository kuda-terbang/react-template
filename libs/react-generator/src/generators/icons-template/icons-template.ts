import { addProjectConfiguration, formatFiles, Tree } from '@nrwl/devkit';
import { addFiles, normalizeOptions } from '../../utils/file-modifier';
import { IconsGeneratorSchema } from './schema';

export default async function (tree: Tree, options: IconsGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions, 'icons-template', 'files');
  await formatFiles(tree);
}
