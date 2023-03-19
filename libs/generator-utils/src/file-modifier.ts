import {
  generateFiles,
  getWorkspaceLayout,
  logger,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';

type DefaultSchema = {
  name: string;
  tags?: string;
};
export type NormalizedSchema<TOptions> = TOptions &
  DefaultSchema & {
    npmScope: string;
    projectName: string;
    projectRoot: string;
    projectDirectory: string;
    parsedTags: string[];
  };

export function normalizeOptions<TOptions extends DefaultSchema>(
  tree: Tree,
  options: TOptions,
  typeDir: 'lib' | 'app' = 'lib'
): NormalizedSchema<TOptions> {
  const workspaceLayout = getWorkspaceLayout(tree);
  const name = names(options.name).fileName;
  const projectDirectory = name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${
    workspaceLayout[typeDir === 'lib' ? 'libsDir' : 'appsDir']
  }/${projectDirectory}`;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];

  return {
    ...options,
    npmScope: workspaceLayout.npmScope,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

export const createPath = <TOptions>(
  options: NormalizedSchema<TOptions>,
  oldPath: string,
  newPath: string
) => ({
  newPath: options.projectRoot.concat(newPath),
  oldPath: '/' + options.projectRoot.concat(oldPath),
});

export function addFiles<TOptions>(
  tree: Tree,
  options: NormalizedSchema<TOptions>,
  libraryName: string,
  generatorName: string,
  directoryName: string
) {
  logger.log(`GENERATE FILES ${generatorName} ${directoryName}`);
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
    tmpl: '',
  };
  const outputPath = `${tree.root}/libs/${libraryName}/src/generators/${generatorName}/${directoryName}`;
  logger.log(`projectRoot : ${options.projectRoot}`);
  logger.log(`outputPath : ${outputPath}`);
  logger.log('');
  generateFiles(tree, outputPath, options.projectRoot, templateOptions);
}

export function replaceContentFile<TOptions>({
  tree,
  options,
  path,
  fromString,
  toString,
}: {
  tree: Tree;
  options: NormalizedSchema<TOptions>;
  path: string;
  fromString: string;
  toString: string;
}) {
  const filePath = '/' + options.projectRoot + path;
  const fileContent = tree.read(filePath);
  const fileContentString =
    fileContent?.toString().replace(new RegExp(fromString, 'g'), toString) || '';
  const fileContentBuffer = Buffer.from(fileContentString, 'utf-8');
  tree.write(filePath, fileContentBuffer);
  logger.log(`REPLACE ${fromString} with ${toString} : ${filePath}`);
}

export function addModules<TOptions>({
  tree,
  options,
  modulePath,
  targetModulePath,
  replaceStrings,
  deleteFiles,
}: {
  tree: Tree;
  options: NormalizedSchema<TOptions>;
  modulePath: string;
  targetModulePath: string;
  replaceStrings?: {
    fromString: string;
    toString: string;
    paths: string[];
  }[];
  deleteFiles?: string[];
}) {
  logger.log('GENERATE module', modulePath);
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  const sourcePath = tree.root.concat(modulePath);
  const targetPath = options.projectRoot + targetModulePath;

  generateFiles(tree, sourcePath, targetPath, templateOptions);

  if (replaceStrings) {
    replaceStrings.forEach((replaceString) => {
      replaceString.paths.forEach((path) => {
        replaceContentFile({
          tree,
          options,
          path,
          fromString: replaceString.fromString,
          toString: replaceString.toString,
        });
      });
    });
  }

  if (deleteFiles) {
    deleteFiles.forEach((deleteFilePath) => {
      tree.delete(options.projectRoot.concat(deleteFilePath));
    });
  }
}

export function copyFile(tree: Tree, oldPath: string, newPath: string) {
  const readPublicFile = tree.read(oldPath);
  tree.write(newPath, readPublicFile || '');
  logger.log(`COPY : ${oldPath} to ${newPath}`);
}
export const copyFiles = (tree: Tree, paths: { oldPath: string; newPath: string }[]) => {
  paths.forEach((path) => {
    copyFile(tree, path.oldPath, path.newPath);
  });
};

export function moveFile(tree: Tree, oldPath: string, newPath: string) {
  const readPublicFile = tree.read(oldPath);
  tree.write(newPath, readPublicFile || '');
  tree.delete(oldPath);
  logger.log(`MOVE : ${oldPath} to ${newPath}`);
}
export const moveFiles = (tree: Tree, paths: { oldPath: string; newPath: string }[]) => {
  paths.forEach((path) => {
    moveFile(tree, path.oldPath, path.newPath);
  });
};

export const deleteFileInstance =
  <TOptions>({
    tree,
    normalizedOptions,
  }: {
    tree: Tree;
    normalizedOptions: NormalizedSchema<TOptions>;
  }) =>
  (path: string | string[]) => {
    if (typeof path === 'object') {
      path.forEach((strPath) => {
        tree.delete(normalizedOptions.projectRoot.concat(strPath));
      });
    } else {
      tree.delete(normalizedOptions.projectRoot.concat(path));
    }
  };
