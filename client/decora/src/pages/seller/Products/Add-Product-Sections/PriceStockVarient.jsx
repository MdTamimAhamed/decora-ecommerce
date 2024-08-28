import {
	Box,
	Checkbox,
	FormControlLabel,
	Paper,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import InputHandler from '../../../../components/forms/form-controllers/InputHandler';
import ItemSelector from '../../../../components/forms/form-controllers/ItemSelector';

function PriceStockVarient() {
	const [hasVarient, setHasVarient] = useState(false);
	function handleVarientBox() {
		setHasVarient(!hasVarient);
	}
	return (
		<Paper
			sx={{
				width: '100%',
				padding: 4,
				mt: 8,
				boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
			}}>
			<Typography color='primary' variant='h6' fontWeight={600}>
				Product Price,Stock and Varient
			</Typography>

			<Paper variant='outlined' sx={{ padding: 3, mt: 3 }}>
				<Box>
					<Typography mb={1} fontWeight={600}>
						Set Product Price
					</Typography>
				</Box>
				{/* <ItemSelector label='Select product category' size='medium' /> */}
				<Box sx={{ display: 'flex', gap: 3 }}>
					<InputHandler
						required
						labelName='Price'
						type='number'
						placeholder='Enter price'
						size='medium'
					/>
					<InputHandler
						labelName='Discount Price'
						type='text'
						placeholder='Enter discount price (optional)'
						size='medium'
					/>

					<Box sx={{ minWidth: '300px', display: 'flex' }}>
						<FormControlLabel
							value='bottom'
							label='Varient'
							control={<Checkbox />}
							labelPlacement='bottom'
							onClick={handleVarientBox}
						/>
						{hasVarient && (
							<InputHandler
								labelName='Number of varients'
								type='number'
								placeholder='Varient number'
								size='medium'
							/>
						)}
					</Box>
				</Box>
			</Paper>
		</Paper>
	);
}

export default PriceStockVarient;
