import LayoutBasic from './layout-basic'
import LayoutEmpty from './layout-empty'

const layout = {
  LayoutBasic,
  LayoutEmpty,
}
export { LayoutBasicContext } from './layout-basic'
export type LayoutType = keyof typeof layout

export default layout;
