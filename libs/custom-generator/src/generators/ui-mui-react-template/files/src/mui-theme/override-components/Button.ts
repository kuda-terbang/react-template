import type { Theme } from '@mui/material/styles'

const props: Theme['components'] = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
}
export default props