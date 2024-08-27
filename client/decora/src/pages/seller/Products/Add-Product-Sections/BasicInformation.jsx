import { useTheme } from '@emotion/react';
import { Box, Divider, Paper, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { ClearOutlined } from '@mui/icons-material';
import InputFileUploadSmall from '../../../../components/reuseables/InputFileUploadSmall';
import InputHandler from '../../../../components/forms/form-controllers/InputHandler';
import ItemSelector from '../../../../components/forms/form-controllers/ItemSelector';

const StyledDeleteBtn = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: -10,
	right: -10,
	height: '20px',
	width: '20px',
	borderRadius: '50px',
	border: '1px solid rgba(0,0,0,0.2)',
	backgroundColor: theme.palette.common.white,
	color: theme.palette.custom.dark_red,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	':hover': {
		cursor: 'pointer',
	},
}));

function BasicInformation() {
	const theme = useTheme();
	const [cover, setCover] = useState(null);
	const [files, setFiles] = useState([]);
	const [limit, setLimit] = useState(0);

	function handleFileDelete(index) {
		setFiles((fileArr) => fileArr.filter((_, i) => i !== index));
		setLimit((previous) => previous - 1);
	}

	const furnitureCategories = [
		'Living Room Furniture',
		'Bedroom Furniture',
		'Dining Room Furniture',
		'Office Furniture',
		'Storage Solutions',
		'Outdoor Furniture',
		"Children's Furniture",
		'Sofas & Armchairs',
		'Coffee Tables',
		'Shelving Units',
		'Wardrobes & Closets',
		'Beds & Mattresses',
		'Lighting Fixtures',
		'Rugs & Carpets',
		'Curtains & Blinds',
		'Wall Art & Decor',
		'Kitchen & Dining Accessories',
		'Bathroom Storage & Accessories',
		'Home Textiles (Cushions, Throws, etc.)',
		'Decorative Mirrors',
	];

	return (
		<Paper
			sx={{
				width: '100%',
				padding: 4,
				boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
			}}>
			<Typography variant='h6' fontWeight={600}>
				Basic Information of Product
			</Typography>
			<Paper variant='outlined' sx={{ padding: 3, mt: 3 }}>
				<Typography fontWeight={600}>Product Image/Video</Typography>
				<Typography color='#bbb'>Upload atleast 3 product image</Typography>

				{/*---------------- upload buttons and previews------------------ */}
				<Box sx={{ display: 'flex', gap: 3, my: 3 }}>
					<Box>
						<InputFileUploadSmall setState={setCover} />
						<Typography variant='subtitle2' textAlign='center' color='#ccc'>
							Cover image
						</Typography>
					</Box>

					<Divider orientation='vertical' flexItem />

					<Box>
						<InputFileUploadSmall
							maxUpload={3}
							limit={limit}
							setLimit={setLimit}
							uploadType='multiple'
							setState={setFiles}
						/>
						<Typography variant='subtitle2' textAlign='center' color='#ccc'>
							Images (max-3)
						</Typography>
					</Box>

					<Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
						{cover ? (
							<Paper variant='outlined' sx={{ height: 100, width: 100 }}>
								<>
									<img
										src={URL.createObjectURL(cover)}
										height='100%'
										width='100%'
									/>
									<Typography
										sx={{
											textAlign: 'center',
											color: `${theme.palette.custom.dark_red}`,
											fontSize: '0.8em',
										}}>
										Cover image*
									</Typography>
								</>
							</Paper>
						) : null}

						{files.length > 0 ? (
							<>
								{files.map((item, index) => (
									<Paper
										key={index}
										variant='outlined'
										sx={{ position: 'relative', height: 100, width: 100 }}>
										<>
											<img
												src={URL.createObjectURL(item)}
												height='100%'
												width='100%'
											/>
											<Typography
												sx={{
													textAlign: 'center',
													fontSize: '0.8em',
												}}>
												{`image(${index + 1})`}
											</Typography>

											<StyledDeleteBtn onClick={() => handleFileDelete(index)}>
												<ClearOutlined fontSize='1rem' />
											</StyledDeleteBtn>
										</>
									</Paper>
								))}
							</>
						) : null}
					</Box>
				</Box>
				{/*------------------------------------------------------------- */}
			</Paper>
			<Paper variant='outlined' sx={{ padding: 3, mt: 5 }}>
				<Typography fontWeight={600}>Product Information</Typography>
				<Typography color='#bbb'>
					Provide all the information of the product
				</Typography>
				<Box sx={{ mt: 2, maxWidth: { xl: '80%', md: '100%' } }}>
					<InputHandler
						labelName='Product Name'
						type='text'
						placeholder='Enter Product Name (English)'
						size='medium'
					/>
					<InputHandler
						labelName='প্রোডাক্টের নাম'
						type='text'
						placeholder='প্রোডাক্টের নাম (বাংলায়)'
						size='medium'
					/>
					<ItemSelector
						label='Select product category'
						size='medium'
						options={furnitureCategories}
					/>
				</Box>
			</Paper>
		</Paper>
	);
}

export default BasicInformation;
