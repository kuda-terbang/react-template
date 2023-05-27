import { ExecutorContext } from '@nrwl/devkit';
import { renameFile } from '../../file-template-rename';
import { RenameTemplateGeneratorExecutorSchema } from './schema';

export default async function runExecutor(
  options: RenameTemplateGeneratorExecutorSchema,
  context: ExecutorContext
) {
  const currentProject = context.workspace.projects[options.projectName];
  renameFile(currentProject.root, { isRevert: options.isRevert });
  return {
    success: true,
  };
}
