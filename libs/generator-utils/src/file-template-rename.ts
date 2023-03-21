import { extname } from 'path';
import { readdirSync, renameSync, lstatSync } from 'fs';

type RenameOption = {
  isRevert?: boolean;
};

export const renameFile = (parentPath: string, options?: RenameOption) => {
  console.log('parentPath', parentPath);
  for (const childPath of readdirSync(`./${parentPath}`)) {
    const currentPath = `${parentPath}/${childPath}`;
    const extension = extname(childPath) as string;
    const isDir = lstatSync(`./${currentPath}`).isDirectory();
    if (isDir) {
      renameFile(currentPath, options);
    }
    if (!options?.isRevert && ['.ts', '.tsx', '.js'].includes(extension)) {
      renameSync(`./${currentPath}`, `./${currentPath}__tmpl__`);
    }
    if (options?.isRevert && extension.includes('__tmpl__')) {
      const revertedName = currentPath.replace('__tmpl__', '');
      renameSync(`./${currentPath}`, `./${revertedName}`);
    }
  }
};
