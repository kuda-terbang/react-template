import { formatFiles, generateFiles, logger, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import * as path from 'path';
import fs from 'fs';
import { libraryGenerator } from '@nrwl/workspace/generators';

import { normalizeOptions } from '@kuda-terbang/generator-utils';
import { CustomGeneratorGeneratorSchema } from './schema';
import { version } from '../../../../../lerna.json';

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
    tmpl: '',
    currentVersion: version,
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

  await libraryGenerator(tree, {
    ...normalizedOptions,
    buildable: true,
  });

  addFiles(tree, normalizedOptions);

  tree.delete(normalizedOptions.projectRoot.concat('/src/lib/'));

  return async () => {
    const fileContent = fs.readFileSync('../../tsconfig.base.json');
    const content = JSON.parse(fileContent.toString());
    const newContent = {
      ...content,
      compilerOptions: {
        ...content.compilerOptions,
        paths: {
          ...content.compilerOptions.paths,
          [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/color`]: [
            `libs/${normalizedOptions.name}/generated/json/color.json`,
          ],
          [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/json/breakpoint`]: [
            `libs/${normalizedOptions.name}/generated/json/breakpoint.json`,
          ],
          [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/json/color`]: [
            `libs/${normalizedOptions.name}/generated/json/color.json`,
          ],
          [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/json/elevation`]: [
            `libs/${normalizedOptions.name}/generated/json/elevation.json`,
          ],
          [`@${normalizedOptions.npmScope}/${normalizedOptions.name}/json/font_style`]: [
            `libs/${normalizedOptions.name}/generated/json/font_style.json`,
          ],
        },
      },
    };
    await fs.writeFileSync('../../tsconfig.base.json', JSON.stringify(newContent, null, 2));
    await formatFiles(tree);
  };
}
