<% if (isUseDesignTheme && !isCraTemplate) { %>
import { theme } from '@kudaterbang/ui-mui-react-example'
export default theme
<% } else { %>
import { createTheme } from '@mui/material/styles';

import Link from './override-component/Link'
import color from './color'
<% } %>

<% if (!isUseDesignTheme || isCraTemplate) { %>
// A custom theme for this app
const theme = createTheme({
  components: {
    ...Link,
  },
  palette: {
    ...color,
  }
});
export default theme;
<% } %>