import { ExecutorContext, logger } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { BuildTemplateExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildTemplateExecutorSchema,
  context: ExecutorContext
) {
  const currentProject = context.workspace.projects[options.projectName];
  const prevPath = `"./${currentProject.root}"`;
  const destinationPath = `"./${options.outputPath}"`;

  logger.log(`COPY : ${prevPath} to ${destinationPath}`);
  execSync(`cp -R ${prevPath} ${destinationPath}`);

  logger.log(`DELETE : nx related file`);
  const deleteFiles = [
    `./${destinationPath}/tsconfig.json`,
    `./${destinationPath}/tsconfig.app.json`,
    `./${destinationPath}/tsconfig.spec.json`,
    `./${destinationPath}/project.json`,
  ];
  execSync(`rm -rf ${deleteFiles.join(' ')}`);
  return {
    success: true,
  };
}
