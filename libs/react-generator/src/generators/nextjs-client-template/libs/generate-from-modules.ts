import { logger, readWorkspaceConfiguration, Tree } from '@nrwl/devkit';
import { addModules } from '@kuda-terbang/generator-utils';

import { NextjsClientTemplateNormalized } from '../schema';

export default function (tree: Tree, options: NextjsClientTemplateNormalized) {
  const workspace = readWorkspaceConfiguration(tree);
  const scopeName = '@' + workspace.npmScope;

  if (options.isCnaTemplate) {
    logger.log('GENERATE util-api and services');
    addModules({
      tree,
      options,
      modulePath: '/libs/util-api/src',
      targetModulePath: `/src/utils/util-api`,
    });
    addModules({
      tree,
      options,
      modulePath: '/libs/data-access-strapi/src',
      targetModulePath: `/src/services/data-access-strapi`,
      replaceStrings: options.isCnaTemplate
        ? [
            {
              fromString: `${scopeName}/util-api`,
              toString: '~/utils/util-api',
              paths: [
                `/src/services/data-access-strapi/lib/model/product.ts`,
                `/src/services/data-access-strapi/lib/api-strapi.endpoint.ts`,
              ],
            },
            {
              fromString: `${scopeName}/data-access-strapi`,
              toString: '~/services/data-access-strapi',
              paths: [
                `/src/containers/home/strapi.tsx`,
                `/src/utils/auth-strapi/lib/auth-strapi.tsx`,
              ],
            },
            // CHECK
            {
              fromString: 'NX_',
              toString: 'NEXT_PUBLIC_',
              paths: [
                `/config/envValue.ts`,
                `/.env-example`,
                `/next.config.js`,
                `/sentry.client.config.js`,
                `/sentry.server.config.js`,
                `/src/services/data-access-strapi/config/envValue.ts`,
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
      targetModulePath: `/src/utils/util-confirmation`,
      replaceStrings: options.isCnaTemplate
        ? [
            {
              fromString: `${scopeName}/util-confirmation`,
              toString: '~/utils/util-confirmation',
              paths: [`/pages/_app.page.tsx`, `/pages/index.page.tsx`],
            },
            {
              fromString: `${scopeName}/${options.designSystemProject}`,
              toString: '~/design-system/index',
              paths: [
                `/src/utils/util-confirmation/components/dialog-confirm/dialog-confirm.view.tsx`,
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
      targetModulePath: `/src/utils/util-auth`,
      replaceStrings: options.isCnaTemplate
        ? [
            {
              fromString: `${scopeName}/util-auth`,
              toString: '~/utils/util-auth',
              paths: [
                `/src/utils/auth-strapi/lib/auth-strapi.tsx`,
                `/src/utils/util-api/lib/util-api.ts`,
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
      targetModulePath: `/src/design-system`,
      replaceStrings: options.isCnaTemplate
        ? [
            {
              fromString: `${scopeName}/${options.designSystemProject}`,
              toString: '~/design-system/index',
              paths: [
                `/pages/_app.page.tsx`,
                `/pages/_document.page.tsx`,
                `/pages/index.page.tsx`,
                `/config/menus.ts`,
                `/src/design-system/components/layout/layout-base.tsx`,
              ],
            },
            {
              fromString: `${scopeName}/${options.designTokenProject}/json/color`,
              toString: '../token/color.json',
              paths: [
                `/src/design-system/utils/generateColor.ts`,
                `/src/design-system/mui-theme/index.ts`,
              ],
            },
          ]
        : undefined,
    });
    addModules({
      tree,
      options,
      modulePath: `/libs/${options.designTokenProject}/build/json`,
      targetModulePath: `/src/design-system/token`,
    });

    logger.log('GENERATE util-common');
    addModules({
      tree,
      options,
      modulePath: '/libs/util-react-common/src',
      targetModulePath: '/src/utils/util-react-common',
      replaceStrings: options.isCnaTemplate
        ? [
            {
              fromString: `${scopeName}/util-react-common`,
              toString: '~/utils/util-react-common',
              paths: ['/src/design-system/components/layout/layout-base.tsx'],
            },
          ]
        : undefined,
    });
  }
}
