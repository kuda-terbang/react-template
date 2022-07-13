import LayoutBasic from './layout-basic';
import LayoutEmpty from './layout-empty';

const layout = {
  LayoutBasic,
  LayoutEmpty,
};
export { LayoutBasicContext } from './layout-basic';
export type LayoutType = keyof typeof layout;
export type { FooterProps, NavbarProps } from './layout-basic'

export default layout;
