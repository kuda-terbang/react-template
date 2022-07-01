import {
  formatFiles,
  getWorkspaceLayout,
  updateJson,
  Tree,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/react'
import { addFiles, normalizeOptions } from '../../utils/file-modifier';
import { UiMuiReactComponentNormalized } from './schema';

export default async function (tree: Tree, options: UiMuiReactComponentNormalized) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    ...normalizedOptions,
  });

  addFiles(tree, normalizedOptions, 'ui-mui-react-template', 'files');
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
