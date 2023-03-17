import { moveFilesToNewDirectory, logger, Tree } from '@nrwl/devkit';
import {
  addFiles,
  moveFile,
  moveFiles,
  createPath,
  deleteFileInstance,
} from '@kuda-terbang/generator-utils';

import { name } from '../../../../project.json';
import { NormalizedReactDashboardSchema } from '../schema';

export default function (tree: Tree, normalizedOptions: NormalizedReactDashboardSchema) {
  logger.log('START restructure for create react app');
  const deleteInstance = deleteFileInstance({ tree, normalizedOptions });

  moveFilesToNewDirectory(
    tree,
    normalizedOptions.projectRoot,
    normalizedOptions.projectRoot.concat('/template')
  );

  // Move nx files to root
  deleteInstance('/template/project.json');
  moveFiles(tree, [
    createPath(normalizedOptions, '/template/tsconfig.json', '/tsconfig.json'),
    createPath(normalizedOptions, '/template/tsconfig.app.json', '/tsconfig.app.json'),
    createPath(normalizedOptions, '/template/tsconfig.spec.json', '/tsconfig.spec.json'),
  ]);

  addFiles(tree, normalizedOptions, name, 'react-dashboard-template', 'cra-files');

  // Move index.html to public
  ['index.html', 'favicon.ico'].forEach((publicFile) => {
    const pathPublicFile =
      '/' + normalizedOptions.projectRoot.concat(`/template/src/${publicFile}`);
    const newPath = normalizedOptions.projectRoot.concat(`/template/public/${publicFile}`);
    moveFile(tree, pathPublicFile, newPath);
  });

  // Rename main.tsx to index.tsx
  logger.log('MODIFY Rename main.tsx to index.tsx');
  const { oldPath, newPath } = createPath(
    normalizedOptions,
    '/template/src/main.tsx',
    '/template/src/index.tsx'
  );
  moveFile(tree, oldPath, newPath);

  // Delete .browserlistrc as may conflict with create-react-app configuration in package.json
  // Delete nx related file
  logger.log('DELETE nx related file');
  deleteInstance([
    '/template/.browserslistrc',
    '/template/.eslintrc.json',
    '/template/.babelrc',
    '/template/src/app/nx-welcome.tsx',
  ]);

  if (normalizedOptions.isDefaultCraTemplate) {
    tree.delete(normalizedOptions.projectRoot.concat('/package.json'));
    addFiles(tree, normalizedOptions, name, 'react-dashboard-template', 'default-cra-files');
  }
}
