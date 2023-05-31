import fs from 'fs';
import { ExecutorContext, logger } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { BuildTemplateExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildTemplateExecutorSchema,
  context: ExecutorContext
) {
  const isApps = fs.existsSync(`./${options.outputPath}`);
  if (!isApps) {
    const splittedDirPath = options.outputPath.split('/');
    const dirPath = splittedDirPath.splice(0, splittedDirPath.length - 1).join('/');
    fs.mkdirSync(`./${dirPath}`, { recursive: true });
  }
  const currentProject = context.workspace.projects[options.projectName];
  const prevPath = `"./${currentProject.root}"`;
  const destinationPath = `"./${options.outputPath}"`;

  logger.log(`COPY : ${prevPath} to ${destinationPath}`);
  execSync(`cp -R ${prevPath} ${destinationPath}`);

  logger.log(`DELETE : nx related file`);
  const deletePathFiles = options.deleteFiles?.map((deleteFile) => {
    return `./${destinationPath}/${deleteFile}`;
  });

  if (deletePathFiles) {
    execSync(`rm -rf ${deletePathFiles.join(' ')}`);
  }

  return {
    success: true,
  };
}
