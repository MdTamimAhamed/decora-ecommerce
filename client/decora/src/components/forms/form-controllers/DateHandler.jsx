import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

function DateHandler({ label, setState, size, margin }) {
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					label={label}
					onChange={(date) => setState(date.toISOString())}
					sx={{ my: `${margin}px` || '10px' }}
					slots={{
						textField: (params) => (
							<TextField
								size={size || 'small'}
								margin='dense'
								fullWidth
								{...params}
							/>
						),
					}}
				/>
			</LocalizationProvider>
		</>
	);
}

export default DateHandler;
