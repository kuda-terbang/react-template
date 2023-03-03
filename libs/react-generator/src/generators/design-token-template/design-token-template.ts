import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  logger,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import fs from 'fs';

import { normalizeOptions } from '../../utils/file-modifier';
import { CustomGeneratorGeneratorSchema } from './schema';

interface NormalizedSchema extends CustomGeneratorGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

async function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    // Define variable used in design-token-template template as it is
    allTokens: [],
  };

  // Copy paste template value
  const designTokenTemplatePath = '/' + options.projectRoot + '/templates';
  const templateFiles = tree.children(designTokenTemplatePath);
  const fileContents = [];

  templateFiles.forEach((templateFile) => {
    const readFilePath = `${designTokenTemplatePath}/${templateFile}`;
    const fileRead = tree.read(readFilePath);
    fileContents.push({
      fileName: templateFile,
      content: fileRead,
    });
    const deleteFilePath = `${options.projectRoot}/templates/${templateFile}`;
    tree.delete(deleteFilePath);
  });
  logger.log('COPY', 'package design-token-template/template');

  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);

  fileContents.forEach((fileContent) => {
    tree.write(
      options.projectRoot.concat(`/templates/${fileContent.fileName}`),
      fileContent.content
    );
  });
  logger.log('DELETE', 'previous /template');
}

export default async function (tree: Tree, options: CustomGeneratorGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/build`,
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  const fileContent = fs.readFileSync('../../tsconfig.base.json');
  const content = JSON.parse(fileContent.toString());
  const newContent = {
    ...content,
    compilerOptions: {
      ...content.compilerOptions,
      paths: {
        ...content.compilerOptions.paths,
        [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/color`]: [
          `libs/${normalizedOptions.name}/build/json/color.json`,
        ],
        [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/json/breakpoint`]: [
          `libs/${normalizedOptions.name}/build/json/breakpoint.json`,
        ],
        [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/json/color`]: [
          `libs/${normalizedOptions.name}/build/json/color.json`,
        ],
        [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/json/elevation`]: [
          `libs/${normalizedOptions.name}/build/json/elevation.json`,
        ],
        [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/json/font_style`]: [
          `libs/${normalizedOptions.name}/build/json/font_style.json`,
        ],
      },
    },
  };

  await fs.writeFileSync('../../tsconfig.base.json', JSON.stringify(newContent));
  await formatFiles(tree);
}
