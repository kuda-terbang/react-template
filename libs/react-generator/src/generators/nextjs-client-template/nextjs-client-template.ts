import { formatFiles, Tree } from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/next';
import { normalizeOptions, addFiles } from '@kuda-terbang/generator-utils';
import { name } from '../../../project.json';
import { NextjsClientTemplateGeneratorSchema } from './schema';
import generateCnaTemplate from './libs/generate-cna-template';
import generateFromModules from './libs/generate-from-modules';

export default async function (tree: Tree, options: NextjsClientTemplateGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options, 'app');

  await applicationGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions, name, 'nextjs-client-template', 'files');

  // Delete pages file from applicationGenerator
  tree.delete(normalizedOptions.projectRoot.concat('/pages/_app.tsx'));
  tree.delete(normalizedOptions.projectRoot.concat('/pages/_document.tsx'));
  tree.delete(normalizedOptions.projectRoot.concat('/pages/index.tsx'));

  if (normalizedOptions.isCnaTemplate) {
    generateCnaTemplate(tree, normalizedOptions);
  }
  generateFromModules(tree, normalizedOptions);

  await formatFiles(tree);
}
