import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  updateJson,
  Tree,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/react'
import * as path from 'path';
import { UiMuiReactComponentGeneratorSchema } from './schema';

interface NormalizedSchema extends UiMuiReactComponentGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[]
}

function normalizeOptions(tree: Tree, options: UiMuiReactComponentGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
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

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
      ...options,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
      template: ''
    };
    generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: UiMuiReactComponentGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);

  // Delete existing template from nrwl/react library generator files
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/'))
  tree.delete(normalizedOptions.projectRoot.concat('/src/index.ts'))

  // Update tsconfig config previously generated from libraryGenerator
  const packageOrgName = getWorkspaceLayout(tree).npmScope
  updateJson(
    tree,
    'tsconfig.base.json',
    (json) => {
      json.compilerOptions.paths = {
        ...json.compilerOptions.paths,
        [`@${packageOrgName}/${normalizedOptions.projectName}`]: [
          `${normalizedOptions.projectRoot}/src/index.tsx`
        ]
      }
      return json;
    }
  );
  updateJson(
    tree,
    `${normalizedOptions.projectRoot}/tsconfig.lib.json`,
    (json) => {
      json.compilerOptions.paths = {
        ...json.compilerOptions.paths,
        [`config/envValue`]: [
          `${normalizedOptions.projectRoot}/src/config/envValue.ts`
        ]
      }
      return json;
    }
  );
}
