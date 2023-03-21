import colors from '@<%= npmScope %>/<%= designTokenProject %>/json/color'
import { createTheme } from '@mui/material/styles';

import components from './override-components'
import generateColor from '../utils/generateColor';

const theme = createTheme({
  components: {
    ...components,
  },
  palette: {
    ...generateColor(colors),
  },
});

export default theme
