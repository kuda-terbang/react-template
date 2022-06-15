import {
  formatFiles,
  getWorkspaceLayout,
  names,
  Tree,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/react'

import { ReactDashboardTemplateGeneratorSchema } from './schema';
import { addFiles } from './util-file'
import generateCraTemplate from './utils/generate-cra-template'
import removeDesignTheme from './utils/remove-design-theme'
import type { NormalizedSchema } from './types'

function normalizeOptions(tree: Tree, options: ReactDashboardTemplateGeneratorSchema): NormalizedSchema {
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

  const installDeps = await applicationGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions, 'files');
  
  if (normalizedOptions.isCraTemplate) {
    generateCraTemplate(tree, normalizedOptions)
  }
  if (normalizedOptions.isUseDesignTheme && !normalizedOptions.isCraTemplate) {
    removeDesignTheme(tree, normalizedOptions)
  }

  await formatFiles(tree);
  return () => installDeps()
}
