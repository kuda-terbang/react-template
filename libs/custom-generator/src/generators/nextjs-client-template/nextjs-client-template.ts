import {
  formatFiles,
  Tree,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/next'
import { NextjsClientTemplateGeneratorSchema } from './schema';
import { normalizeOptions, addFiles } from '../../utils/file-modifier'
import generateCnaTemplate from './libs/generate-cna-template'
import generateFromModules from './libs/generate-from-modules';

export default async function (tree: Tree, options: NextjsClientTemplateGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options, 'app');

  await applicationGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions, 'nextjs-client-template', 'files');
  
  // Delete pages file from applicationGenerator
  tree.delete(normalizedOptions.projectRoot.concat('/pages/_app.tsx'))
  tree.delete(normalizedOptions.projectRoot.concat('/pages/_document.tsx'))
  tree.delete(normalizedOptions.projectRoot.concat('/pages/index.tsx'))

  if (normalizedOptions.isCnaTemplate) {
    generateCnaTemplate(tree, normalizedOptions)
  }
  generateFromModules(tree, normalizedOptions)

  await formatFiles(tree);
}
