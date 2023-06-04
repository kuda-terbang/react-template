import { Tree } from '@nrwl/devkit';
import { areProjectsExist, ProjectExist } from '@kuda-terbang/generator-utils';
import { utilApiGenerator } from '@kuda-terbang/core-util-generator';
import { utilAuthGenerator } from '@kuda-terbang/core-util-web-generator';

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

export const checkAndGenerateDepLibs = async (tree: Tree) => {
  const checkedLibs = ['util-api', 'util-auth'];
  const existingProjects = areProjectsExist(tree, checkedLibs);
  const promiseGenerate = [];
  checkedLibs.forEach((lib) => {
    generateNotExist(tree, promiseGenerate, { packageName: lib, existingProjects });
  });

  if (promiseGenerate.length > 0) {
    await Promise.all(promiseGenerate);
  }
};
