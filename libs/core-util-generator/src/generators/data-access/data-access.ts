import { convertNxGenerator, formatFiles, Tree } from '@nrwl/devkit';
import {
  addFiles,
  areProjectsExist,
  deleteFileInstance,
  normalizeOptions,
  ProjectExist,
} from '@kuda-terbang/generator-utils';
import { libraryGenerator } from '@nrwl/js';
import { utilAuthGenerator } from '@kuda-terbang/core-util-web-generator';
import { utilApiGenerator } from '../util-api/util-api';

import { DataAccessStrapiGeneratorSchema } from './schema';

export const generateNotExist = (
  tree: Tree,
  currentPromise: Promise<void>[],
  {
    packageName,
    existingProjects,
  }: { packageName: string; existingProjects: Record<string, ProjectExist> }
) => {
  if (!existingProjects[packageName].isExist) {
    if (packageName === 'util-api') {
      currentPromise.push(utilApiGenerator(tree, {}));
    }
    if (packageName === 'util-auth') {
      currentPromise.push(utilAuthGenerator(tree, {}));
    }
  }
};

export const dataAccessGenerator = async (tree: Tree, options: DataAccessStrapiGeneratorSchema) => {
  const normalizedOptions = normalizeOptions(tree, options);

  // generate util if not exist
  const checkedLibs = ['util-api', 'util-auth'];
  const existingProjects = areProjectsExist(tree, checkedLibs);
  let usedFilesToCopy = '';
  let projectName = '';
  const promiseGenerate = [];
  if (normalizedOptions.isWebExample) {
    checkedLibs.forEach((lib) => {
      generateNotExist(tree, promiseGenerate, { packageName: lib, existingProjects });
    });
    usedFilesToCopy = 'files-web-example';
    projectName = 'data-access-strapi';
  } else {
    generateNotExist(tree, promiseGenerate, { packageName: 'util-api', existingProjects });
    usedFilesToCopy = 'files';
    projectName = normalizedOptions.name;
  }
  if (promiseGenerate.length > 0) {
    await Promise.all(promiseGenerate);
  }
  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
    bundler: 'tsc',
    config: 'project',
    testEnvironment: 'node',
    publishable: true,
    importPath: `@${normalizedOptions.npmScope}/${projectName}`,
  });
  const deleteInstance = deleteFileInstance({ tree, normalizedOptions });

  addFiles(tree, normalizedOptions, 'core-util-generator', 'data-access', usedFilesToCopy);
  await formatFiles(tree);

  deleteInstance(['/src/lib/data-access-strapi.ts', '/src/lib/data-access-strapi.spec.ts']);
};

export const dataAccessSchematic = convertNxGenerator(dataAccessGenerator);
