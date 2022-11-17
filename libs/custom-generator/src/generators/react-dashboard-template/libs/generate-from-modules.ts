import { logger, readWorkspaceConfiguration, Tree } from '@nrwl/devkit';

import { NormalizedReactDashboardSchema } from '../schema';
import { addModules } from '../../../utils/file-modifier';

export default function (tree: Tree, options: NormalizedReactDashboardSchema) {
  const prefixPath = options.isCraTemplate ? '/template' : '';
  const workspace = readWorkspaceConfiguration(tree);
  const scopeName = '@' + workspace.npmScope;

  if (options.isCraTemplate) {
    logger.log('GENERATE util-api and services');
    addModules({
      tree,
      options,
      modulePath: '/libs/util-api/src',
      targetModulePath: `${prefixPath}/src/utils/util-api`,
    });
    addModules({
      tree,
      options,
      modulePath: '/libs/data-access-strapi/src',
      targetModulePath: `${prefixPath}/src/services/data-access-strapi`,
      replaceStrings: options.isCraTemplate
        ? [
            {
              fromString: `${scopeName}/util-api`,
              toString: 'utils/util-api',
              paths: [
                `${prefixPath}/src/services/data-access-strapi/lib/model/product.ts`,
                `${prefixPath}/src/services/data-access-strapi/lib/api-strapi.endpoint.ts`,
              ],
            },
            {
              fromString: `${scopeName}/data-access-strapi`,
              toString: 'services/data-access-strapi',
              paths: [
                `${prefixPath}/src/app/pages/home/page-home-view.tsx`,
                `${prefixPath}/src/features/common/pages/strapi/strapi.view.tsx`,
                `${prefixPath}/src/features/form/pages/input-component/input-component.view.tsx`,
                `${prefixPath}/src/features/form/pages/smart-input/smart-input.view.tsx`,
                `${prefixPath}/src/utils/auth-strapi/lib/auth-strapi.tsx`,
              ],
            },
            {
              fromString: 'NX_',
              toString: 'REACT_APP_',
              paths: [
                `${prefixPath}/src/config/envValue.ts`,
                `${prefixPath}/src/services/data-access-strapi/config/envValue.ts`,
                `${prefixPath}/.env-example`,
              ],
            },
          ]
        : undefined,
    });

    logger.log('GENERATE Util Confirmation');
    addModules({
      tree,
      options,
      modulePath: '/libs/util-confirmation/src',
      targetModulePath: `${prefixPath}/src/utils/util-confirmation`,
      replaceStrings: options.isCraTemplate
        ? [
            {
              fromString: `${scopeName}/util-confirmation`,
              toString: 'utils/util-confirmation',
              paths: [
                `${prefixPath}/src/app/app.tsx`,
                `${prefixPath}/src/features/common/pages/page-common-view.tsx`,
              ],
            },
            {
              fromString: `${scopeName}/${options.designSystemProject}`,
              toString: 'design-system',
              paths: [
                `${prefixPath}/src/utils/util-confirmation/components/dialog-confirm/dialog-confirm.view.tsx`,
              ],
            },
          ]
        : undefined,
    });

    logger.log('GENERATE Util Auth');
    addModules({
      tree,
      options,
      modulePath: '/libs/util-auth/src',
      targetModulePath: `${prefixPath}/src/utils/util-auth`,
      replaceStrings: options.isCraTemplate
        ? [
            {
              fromString: `${scopeName}/util-auth`,
              toString: 'utils/util-auth',
              paths: [
                `${prefixPath}/src/utils/auth-strapi/lib/auth-strapi.tsx`,
                `${prefixPath}/src/utils/util-api/lib/util-api.ts`,
              ],
            },
          ]
        : undefined,
    });

    logger.log('GENERATE Design System');
    addModules({
      tree,
      options,
      modulePath: `/libs/${options.designSystemProject}/src`,
      targetModulePath: `${prefixPath}/src/design-system`,
      replaceStrings: options.isCraTemplate
        ? [
            {
              fromString: `${scopeName}/${options.designSystemProject}`,
              toString: 'design-system',
              paths: [
                `${prefixPath}/src/app/app.tsx`,
                `${prefixPath}/src/app/pages/RootRoutes.tsx`,
                `${prefixPath}/src/features/common/pages/page-common-view.tsx`,
                `${prefixPath}/src/features/common/pages/strapi/strapi.view.tsx`,
                `${prefixPath}/src/features/form/pages/input-component/input-component.view.tsx`,
                `${prefixPath}/src/features/form/pages/smart-input/smart-input.view.tsx`,
                `${prefixPath}/src/design-system/components/layout/layout-dashboard-csr.tsx`,
              ],
            },
            {
              fromString: `${scopeName}/${options.designTokenProject}/json/color`,
              toString: '../token/color.json',
              paths: [
                `${prefixPath}/src/design-system/utils/generateColor.ts`,
                `${prefixPath}/src/design-system/mui-theme/index.ts`,
              ],
            },
          ]
        : undefined,
    });
    addModules({
      tree,
      options,
      modulePath: `/libs/${options.designTokenProject}/build/json`,
      targetModulePath: `${prefixPath}/src/design-system/token`,
    });
  }
}
