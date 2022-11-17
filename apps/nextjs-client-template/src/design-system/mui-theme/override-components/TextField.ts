import type { Theme } from '@mui/material/styles';

const TextField: Theme['components'] = {
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
  },
};
export default TextField;
