import {
  formatFiles,
  Tree,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/react'

import { ReactDashboardTemplateGeneratorSchema } from './schema';
import { addFiles, normalizeOptions } from '../../utils/file-modifier'
import generateCraTemplate from './libs/generate-cra-template'
import generateFromModules from './libs/generate-from-modules'

export default async function (tree: Tree, options: ReactDashboardTemplateGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options, 'app');

  await applicationGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions, 'react-dashboard-template', 'files');
  
  if (normalizedOptions.isCraTemplate) {
    generateCraTemplate(tree, normalizedOptions)
  }

  generateFromModules(tree, normalizedOptions)

  await formatFiles(tree);
}
