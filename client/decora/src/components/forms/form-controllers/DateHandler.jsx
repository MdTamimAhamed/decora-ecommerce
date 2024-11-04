import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

function DateHandler({ label, setState, size, margin, value }) {
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					label={label}
					value={value || null}
					onChange={(date) => setState(dayjs(date))}
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
