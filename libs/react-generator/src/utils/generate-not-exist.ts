import { Tree } from '@nx/devkit';
import { areProjectsExist, ProjectExist } from '@kuda-terbang/generator-utils';
import { utilApiGenerator, dataAccessGenerator } from '@kuda-terbang/core-util-generator';
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
    if (packageName === 'data-access-strapi') {
      currentPromise.push(
        dataAccessGenerator(tree, {
          name: 'data-access-strapi',
          isWebExample: true,
        })
      );
    }
  }
};

export const checkAndGenerateDepLibs = async (tree: Tree) => {
  const checkedLibs = ['data-access-strapi'];
  console.log(`> Check these libs ${checkedLibs.join(' ')}`);
  const existingProjects = areProjectsExist(tree, checkedLibs);
  const promiseGenerate = [];
  checkedLibs.forEach((lib) => {
    generateNotExist(tree, promiseGenerate, { packageName: lib, existingProjects });
  });

  if (promiseGenerate.length > 0) {
    await Promise.all(promiseGenerate);
    console.log('> Done add packages');
  } else {
    console.log('> No added packages');
  }
};
