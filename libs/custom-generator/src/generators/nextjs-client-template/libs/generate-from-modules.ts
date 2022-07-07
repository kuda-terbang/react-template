import { logger, readWorkspaceConfiguration, Tree } from "@nrwl/devkit";

import { NextjsClientTemplateNormalized } from "../schema";
import { addModules } from "../../../utils/file-modifier";

export default function (tree: Tree, options: NextjsClientTemplateNormalized) {
  const workspace = readWorkspaceConfiguration(tree)
  const scopeName = '@' + workspace.npmScope

  if (options.isCnaTemplate) {
    logger.log('GENERATE util-api and services')
    addModules({
      tree,
      options,
      modulePath: '/libs/util-api/src',
      targetModulePath: `/src/utils/util-api`,
    })
    addModules({
      tree,
      options,
      modulePath: '/libs/data-access-strapi/src',
      targetModulePath: `/src/services/data-access-strapi`,
      replaceStrings: options.isCnaTemplate ? [
        {
          fromString: `${scopeName}/util-api`,
          toString: '~/utils/util-api',
          paths: [
            `/src/services/data-access-strapi/lib/model/product.ts`,
            `/src/services/data-access-strapi/lib/api-strapi.endpoint.ts`,
          ]
        },
        {
          fromString: `${scopeName}/data-access-strapi`,
          toString: '~/services/data-access-strapi',
          paths: [
            `/src/containers/home/strapi.tsx`,
            `/src/utils/auth-strapi/lib/auth-strapi.tsx`,
          ]
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
          ]
        },
      ] : undefined
    })

    logger.log('GENERATE Util Confirmation')
    addModules({
      tree,
      options,
      modulePath: '/libs/util-confirmation/src',
      targetModulePath: `/src/utils/util-confirmation`,
      replaceStrings: options.isCnaTemplate ? [
        {
          fromString: `${scopeName}/util-confirmation`,
          toString: '~/utils/util-confirmation',
          paths: [
            `/pages/_app.page.tsx`,
            `/pages/index.page.tsx`,
          ]
        },
        {
          fromString: `${scopeName}/${options.designSystemProject}`,
          toString: '~/design-system/index',
          paths: [
            `/src/utils/util-confirmation/components/dialog-confirm/dialog-confirm.view.tsx`,
          ]
        },
      ] : undefined
    })

    logger.log('GENERATE Util Auth')
    addModules({
      tree,
      options,
      modulePath: '/libs/util-auth/src',
      targetModulePath: `/src/utils/util-auth`,
      replaceStrings: options.isCnaTemplate ? [
        {
          fromString: `${scopeName}/util-auth`,
          toString: '~/utils/util-auth',
          paths: [
            `/src/utils/auth-strapi/lib/auth-strapi.tsx`,
            `/src/utils/util-api/lib/util-api.ts`,
          ]
        },
      ] : undefined
    })

    logger.log('GENERATE Design System')
    addModules({
      tree,
      options,
      modulePath: `/libs/${options.designSystemProject}/src`,
      targetModulePath: `/src/design-system`,
      replaceStrings: options.isCnaTemplate ? [
        {
          fromString: `${scopeName}/${options.designSystemProject}`,
          toString: '~/design-system/index',
          paths: [
            `/pages/_app.page.tsx`,
            `/pages/_document.page.tsx`,
            `/pages/index.page.tsx`,
          ]
        },
        {
          fromString: `${scopeName}/${options.designTokenProject}/json/color`,
          toString: '../token/color.json',
          paths: [
            `/src/design-system/utils/generateColor.ts`,
            `/src/design-system/mui-theme/index.ts`,
          ]
        },
        {
          fromString: 'NX_',
          toString: 'NEXT_PUBLIC_',
          paths: [
            `/src/design-system/config/envValue.ts`,
          ]
        },
      ] : undefined
    })
    addModules({
      tree,
      options,
      modulePath: `/libs/${options.designTokenProject}/build/json`,
      targetModulePath: `/src/design-system/token`,
    })
  }
}