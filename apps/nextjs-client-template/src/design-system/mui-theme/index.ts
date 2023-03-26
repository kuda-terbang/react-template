import { json } from '../token/src';
import { createTheme } from '@mui/material/styles';

import Button from './override-components/Button';
import Link from './override-components/Link';
import TextField from './override-components/TextField';
import generateColor from '../utils/generateColor';

const theme = createTheme({
  components: {
    MuiButtonBase: Button?.MuiButtonBase,
    MuiLink: Link?.MuiLink,
    MuiTextField: TextField?.MuiTextField,
  },
  palette: {
    ...generateColor(json.color),
  },
});

export default theme;
