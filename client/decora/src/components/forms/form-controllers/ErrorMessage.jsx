import { Typography } from '@mui/material';

function ErrorMessage({ check, mt }) {
	return (
		<>
			<Typography
				variant='body2'
				color='error'
				fontWeight='400'
				sx={{
					mt: check && check.msg ? mt || '0px' : '0px',
					visibility: check && check.msg ? 'visible' : 'hidden',
				}}>{`${check ? check.msg : ''}`}</Typography>
		</>
	);
}

export default ErrorMessage;
