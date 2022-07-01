import { Tree } from "@nrwl/devkit";

import { NormalizedReactDashboardSchema } from "../types";

export default (tree: Tree, normalizedOptions: NormalizedReactDashboardSchema) => {
  const designPath = (path: string) => normalizedOptions.projectRoot.concat(path)
  tree.delete(designPath('/src/app/styles/color.ts'))
  tree.delete(designPath('/src/app/styles/override-component/'))
  tree.delete(designPath('/src/components/'))
}