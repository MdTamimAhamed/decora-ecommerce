import { Typography } from '@mui/material';

function ErrorMessage({ check }) {
	return (
		<>
			<Typography
				variant='body2'
				color='error'
				fontWeight='400'
				sx={{
					mt: check && check.msg ? '-10px' : '0px',
					visibility: check && check.msg ? 'visible' : 'hidden',
				}}>{`${check ? check.msg : ''}`}</Typography>
		</>
	);
}

export default ErrorMessage;
