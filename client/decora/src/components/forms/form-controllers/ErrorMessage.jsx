import { Typography } from '@mui/material';

function ErrorMessage({ check, mt, isEmpty, color }) {
	const option = isEmpty || 'DEFAULT';
	if (option === isEmpty) {
		if (!isEmpty) {
			return (
				<Typography
					variant='body2'
					color='error'
					fontWeight='400'
					sx={{
						mt: check && check.msg ? mt || '0px' : '0px',
						visibility: check && check.msg ? 'visible' : 'hidden',
					}}>{`${check ? check.msg : ''}`}</Typography>
			);
		} else return '';
	}
	if (option === 'DEFAULT') {
		return (
			<Typography
				variant='body2'
				color={color || 'error'}
				fontWeight='400'
				sx={{
					mt: check && check.msg ? mt || '0px' : '0px',
					visibility: check && check.msg ? 'visible' : 'hidden',
				}}>{`${check ? check.msg : ''}`}</Typography>
		);
	}
	return <></>;
}

export default ErrorMessage;
