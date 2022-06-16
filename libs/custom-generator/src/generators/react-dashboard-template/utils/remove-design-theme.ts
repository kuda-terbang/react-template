import { Tree } from "@nrwl/devkit";

import { NormalizedSchema } from "../types";

export default (tree: Tree, normalizedOptions: NormalizedSchema) => {
  const designPath = (path: string) => normalizedOptions.projectRoot.concat(path)
  tree.delete(designPath('/src/app/styles/color.ts'))
  tree.delete(designPath('/src/app/styles/override-component/'))
  tree.delete(designPath('/src/components/'))
}