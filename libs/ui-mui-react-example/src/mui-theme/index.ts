import colors from '@kudaterbang/design-token-example/json/color';
import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import components from './override-components';
import generateColor from '../utils/generateColor';

const theme = createTheme({
  components: {
    ...components,
  },
  palette: {
    ...generateColor(colors),
  },
});

export default theme;
