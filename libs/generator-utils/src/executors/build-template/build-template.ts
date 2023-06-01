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
    await fs.mkdirSync(`./${dirPath}`, { recursive: true });
    console.log('> Path folder created');
  }

  const currentProject = context.workspace.projects[options.projectName];
  const prevPath = `"./${currentProject.root}"`;
  const destinationPath = `"./${options.outputPath}"`;

  // Copy file
  logger.log(`COPY : ${prevPath} to ${destinationPath}`);
  execSync(`cp -R ${prevPath} ${destinationPath}`);

  logger.log(`DELETE : nx related file`);
  const deletePathFiles = options.deleteFiles?.map((deleteFile) => {
    return `./${destinationPath}/${deleteFile}`;
  });

  if (deletePathFiles) {
    execSync(`rm -rf ${deletePathFiles.join(' ')}`);
  }

  // Check LICENSE file
  let hasLicense = false;
  let licensePath = '';
  const paths = [`./${currentProject.root}/LICENSE`, './LICENSE'];
  paths.forEach((path) => {
    const isLicenseExist = fs.existsSync(path);
    if (!hasLicense && isLicenseExist) {
      hasLicense = true;
      licensePath = path;
    }
  });
  if (hasLicense) {
    console.log(`COPY : ${licensePath} ${destinationPath}/LICENSE`);
    execSync(`cp ${licensePath} ${destinationPath}/LICENSE`);
  } else {
    throw 'Error, project root or package has no license. Please add in root directory or package/lib root directory. Try using https://choosealicense.com/licenses';
  }

  return {
    success: true,
  };
}
