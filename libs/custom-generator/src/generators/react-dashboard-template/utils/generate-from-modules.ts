import { logger, Tree } from "@nrwl/devkit";

import { NormalizedSchema } from "../types";
import { addModules } from "../util-file";

export default function (tree: Tree, options: NormalizedSchema) {
  if (options.isUseUtilApi || options.isCraTemplate) {
    logger.log('GENERATE util-api and services')
    const prefixPath = options.isCraTemplate ? '/template' : ''
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
            `${prefixPath}/src/features/common/pages/strapi/strapi.view.tsx`,
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
}