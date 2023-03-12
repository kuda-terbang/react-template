import {
  formatFiles,
  getWorkspaceLayout,
  updateJson,
  Tree,
  readWorkspaceConfiguration,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/react';
import { addFiles, addModules, normalizeOptions } from '@kuda-terbang/generator-utils';
import { name } from '../../../project.json';
import { UiMuiReactComponentNormalized } from './schema';

export default async function (tree: Tree, options: UiMuiReactComponentNormalized) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions, name, 'ui-mui-react-template', 'files');
  await formatFiles(tree);

  if (!options.withLocalToken) {
    const scopeName = '@' + readWorkspaceConfiguration(tree).npmScope;
    addModules({
      tree,
      options: normalizedOptions,
      modulePath: `/libs/${options.designTokenProject}/build/json`,
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
  tree.delete(normalizedOptions.projectRoot.concat('/src/index.ts'));

  // Update tsconfig config previously generated from libraryGenerator
  const packageOrgName = getWorkspaceLayout(tree).npmScope;
  updateJson(tree, 'tsconfig.base.json', (json) => {
    json.compilerOptions.paths = {
      ...json.compilerOptions.paths,
      [`@${packageOrgName}/${normalizedOptions.projectName}`]: [
        `${normalizedOptions.projectRoot}/src/index.tsx`,
      ],
    };
    return json;
  });
  updateJson(tree, `${normalizedOptions.projectRoot}/tsconfig.lib.json`, (json) => {
    json.compilerOptions.paths = {
      ...json.compilerOptions.paths,
      [`config/envValue`]: [`${normalizedOptions.projectRoot}/src/config/envValue.ts`],
    };
    return json;
  });
}
