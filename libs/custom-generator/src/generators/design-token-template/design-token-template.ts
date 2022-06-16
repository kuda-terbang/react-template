import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  logger,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { CustomGeneratorGeneratorSchema } from './schema';

interface NormalizedSchema extends CustomGeneratorGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: CustomGeneratorGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
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

async function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    // Define variable used in design-token-template template as it is
    allTokens: [],
  };

  // Copy paste template value
  logger.log('options.projectRoot', options.projectRoot)
  const designTokenTemplatePath = '/' + options.projectRoot + '/templates'
  const templateFiles = tree.children(designTokenTemplatePath)
  const fileContents = []

  templateFiles.forEach((templateFile) => {
    const readFilePath = `${designTokenTemplatePath}/${templateFile}`
    const fileRead = tree.read(readFilePath)
    fileContents.push({
      fileName: templateFile,
      content: fileRead,
    })
    const deleteFilePath = `${options.projectRoot}/templates/${templateFile}`
    tree.delete(deleteFilePath)
  })
  logger.log('COPY', 'package design-token-template/template')

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );

  fileContents.forEach((fileContent) => {
    tree.write(options.projectRoot.concat(`/templates/${fileContent.fileName}`), fileContent.content)
  })
  logger.log('DELETE', 'previous /template')
}

export default async function (
  tree: Tree,
  options: CustomGeneratorGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}