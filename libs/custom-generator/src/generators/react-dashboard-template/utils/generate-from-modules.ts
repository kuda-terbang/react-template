import { logger, Tree } from "@nrwl/devkit";

import { NormalizedSchema } from "../types";
import { addModules } from "../util-file";

export default function (tree: Tree, options: NormalizedSchema) {
  const prefixPath = options.isCraTemplate ? '/template' : ''

  if (options.isUseUtilApi || options.isCraTemplate) {
    logger.log('GENERATE util-api and services')
    addModules({
      tree,
      options,
      modulePath: '/libs/util-api/src',
      targetModulePath: `${prefixPath}/src/utils/util-api`,
    })
    addModules({
      tree,
      options,
      modulePath: '/libs/data-access-strapi/src',
      targetModulePath: `${prefixPath}/src/services/data-access-strapi`,
      replaceStrings: options.isCraTemplate ? [
        {
          fromString: '@kudaterbang/util-api',
          toString: 'utils/util-api',
          paths: [
            `${prefixPath}/src/services/data-access-strapi/lib/model/product.ts`,
            `${prefixPath}/src/services/data-access-strapi/lib/api-strapi.endpoint.ts`,
          ]
        },
        {
          fromString: '@kudaterbang/data-access-strapi',
          toString: 'services/data-access-strapi',
          paths: [
            `${prefixPath}/src/app/pages/home/page-home-view.tsx`,
            `${prefixPath}/src/features/common/pages/strapi/strapi.view.tsx`,
            `${prefixPath}/src/utils/auth-strapi/lib/auth-strapi.tsx`,
          ]
        },
        {
          fromString: 'NX_',
          toString: 'REACT_APP_',
          paths: [
            `${prefixPath}/src/config/envValue.ts`,
            `${prefixPath}/src/services/data-access-strapi/config/envValue.ts`,
            `${prefixPath}/.env-example`,
          ]
        },
      ] : undefined
    })
  }
  if (options.isUseUtilAuth || options.isCraTemplate) {
    logger.log('Generate Util Auth')
    addModules({
      tree,
      options,
      modulePath: '/libs/util-auth/src',
      targetModulePath: `${prefixPath}/src/utils/util-auth`,
      replaceStrings: options.isCraTemplate ? [
        {
          fromString: '@kudaterbang/util-auth',
          toString: 'utils/util-auth',
          paths: [
            `${prefixPath}/src/utils/auth-strapi/lib/auth-strapi.tsx`,
            `${prefixPath}/src/utils/util-api/lib/util-api.ts`,
          ]
        },
      ] : undefined
    })
  }
}