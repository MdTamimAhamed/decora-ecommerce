import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
	countries,
	bangladeshDistricts,
	areas,
} from '../../utils/country-district-area-postalcode';

export default function CountrySelector({
	label,
	size,
	selectOption,
	state,
	setState,
}) {
	const [cities, setCities] = useState([]);

	// function handleSelection(){
	// 	if(selectOption === 'area'){
	// 		const districtWiseCities = areas.find((area)=> area.district ==)
	// 	}
	// }

	return (
		<Autocomplete
			id='country-select-demo'
			sx={{ width: '100%' }}
			options={
				(selectOption === 'country' && countries) ||
				(selectOption === 'district' && bangladeshDistricts)
			}
			autoHighlight
			getOptionLabel={(option) => option.label}
			onChange={(e) => setState(e.target.value)}
			renderOption={(props, option) => {
				const { key, ...optionProps } = props;
				return (
					<Box
						key={key}
						component='li'
						sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
						{...optionProps}>
						{option.code ? (
							<img
								loading='lazy'
								width='20'
								srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
								src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
								alt=''
							/>
						) : null}
						{option.label}
					</Box>
				);
			}}
			renderInput={(params) => (
				<TextField {...params} sx={{ my: 1 }} size={size} label={label} />
			)}
		/>
	);
}
