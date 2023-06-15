import {
  formatFiles,
  getWorkspaceLayout,
  updateJson,
  Tree,
  readWorkspaceConfiguration,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/react';
import { addFiles, addModules, normalizeOptions } from '@kuda-terbang/generator-utils';
import { name } from '../../../project.json';
import { UiMuiReactComponentNormalized } from './schema';
import { Linter } from '@nx/linter';

export default async function (tree: Tree, options: UiMuiReactComponentNormalized) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
    publishable: true,
    importPath: `@${normalizedOptions.npmScope}/${normalizedOptions.name}`,
    style: 'none',
    skipFormat: false,
    skipTsConfig: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
  });

  addFiles(tree, normalizedOptions, name, 'ui-mui-react-template', 'files');
  await formatFiles(tree);

  if (!options.withLocalToken) {
    const scopeName = '@' + readWorkspaceConfiguration(tree).npmScope;
    addModules({
      tree,
      options: normalizedOptions,
      modulePath: `/libs/${options.designTokenProject}/generated/json`,
      targetModulePath: '/src/token',
      replaceStrings: [
        {
          fromString: `${scopeName}/${options.designTokenProject}/json/color`,
          toString: '../token/color.json',
          paths: ['/src/mui-theme/index.ts', '/src/utils/generateColor.ts'],
        },
      ],
    });
  }

  // Delete existing template from nrwl/react library generator files
  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/'));

  // Update tsconfig config previously generated from libraryGenerator
  const packageOrgName = getWorkspaceLayout(tree).npmScope;
  updateJson(tree, 'tsconfig.base.json', (json) => {
    json.compilerOptions.paths = {
      ...json.compilerOptions.paths,
      [`@${packageOrgName}/${normalizedOptions.projectName}`]: [
        `${normalizedOptions.projectRoot}/src/index.ts`,
      ],
    };
    return json;
  });
}
