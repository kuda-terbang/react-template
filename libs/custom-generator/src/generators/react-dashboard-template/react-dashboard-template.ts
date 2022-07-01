import {
  formatFiles,
  getWorkspaceLayout,
  names,
  Tree,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/react'

import { NormalizedReactDashboardSchema, ReactDashboardTemplateGeneratorSchema } from './schema';
import { addFiles } from '../../utils/file-modifier'
import generateCraTemplate from './libs/generate-cra-template'
import generateFromModules from './libs/generate-from-modules'
import removeDesignTheme from './libs/remove-design-theme'

function normalizeOptions(
  tree: Tree,
  options: ReactDashboardTemplateGeneratorSchema,
): NormalizedReactDashboardSchema {
  const name = names(options.name).fileName;
  const projectDirectory = name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

export default async function (tree: Tree, options: ReactDashboardTemplateGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await applicationGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions, 'react-dashboard-template', 'files');
  
  if (normalizedOptions.isCraTemplate) {
    generateCraTemplate(tree, normalizedOptions)
  }
  if (normalizedOptions.isUseDesignTheme && !normalizedOptions.isCraTemplate) {
    removeDesignTheme(tree, normalizedOptions)
  }
  generateFromModules(tree, normalizedOptions)

  await formatFiles(tree);
}
