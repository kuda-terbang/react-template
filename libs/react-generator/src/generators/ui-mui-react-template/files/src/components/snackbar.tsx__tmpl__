import React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {
	OptionsObject,
	SnackbarContent,
  SnackbarKey,
	SnackbarMessage,
  SnackbarProvider,
  SnackbarProviderProps,
	VariantType,
	useSnackbar as useSnackbarNotistack,
} from 'notistack';
import { styled } from '@mui/system';

type Props = {
  children: React.ReactNode;
};
type SnackbarConfig = Omit<SnackbarProviderProps, 'children'>;

const snackbarConfig: SnackbarConfig = {
  maxSnack: 3,
};

const StyledIconButton = styled(IconButton)`
	color: white;
`

interface SnackbarCustomProps {
  id: SnackbarKey
  message: SnackbarMessage
	variant: VariantType
}

const SnackbarCustom = React.forwardRef<HTMLDivElement, SnackbarCustomProps>((props, ref) => {
	const { closeSnackbar } = useSnackbarNotistack()
  const { id, message, variant, ...other } = props
	const onClickDismiss = () => {
    closeSnackbar(id);
  };
	const severity: Record<string, AlertColor> = {
		error: 'error',
		info: 'info',
		warning: 'warning',
		success: 'success',
	}
  return (
    <SnackbarContent ref={ref} role="alert" {...other}>
			<Alert variant="filled" severity={severity[variant] || 'success'}>
				{message}
				<StyledIconButton onClick={onClickDismiss} size="small" aria-label="close">
					<CloseIcon fontSize="small" />
				</StyledIconButton>
			</Alert>
    </SnackbarContent>
  )
})

export const Snackbar = ({ children }: Props) => {
  return (
    <SnackbarProvider {...snackbarConfig}>
      {children}
    </SnackbarProvider>
  );
};

export const useSnackbar = () => {
	const { enqueueSnackbar } = useSnackbarNotistack()
	const showSnackbar = (variant: VariantType, message: SnackbarMessage, options?: OptionsObject) => {
		enqueueSnackbar(message, {
			...options,
			content: (key, message) => (
				<SnackbarCustom id={key} message={message} variant={variant} />
			),
		})
	}
	return {
		showSnackbar
	}
}
