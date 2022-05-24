import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  logger,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/react'
import * as path from 'path';
import { ReactDashboardTemplateGeneratorSchema } from './schema';

interface NormalizedSchema extends ReactDashboardTemplateGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[]
}

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

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: ''
  };
  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: ReactDashboardTemplateGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  const installDeps = await applicationGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions);
  
  logger.log('COPY env file')
  const envFile = tree.read(normalizedOptions.projectRoot.concat('/.env-example'))
  const envPath = normalizedOptions.projectRoot.concat('/.env')
  tree.write(envPath, envFile)

  await formatFiles(tree);
  return () => installDeps()
}
