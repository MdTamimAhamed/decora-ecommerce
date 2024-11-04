import { useTheme } from '@emotion/react';
import { Box, Divider, Paper, styled, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { ClearOutlined } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InputFileUploadSmall from '../../../../components/reuseables/InputFileUploadSmall';
import InputHandler from '../../../../components/forms/form-controllers/InputHandler';
import ItemSelector from '../../../../components/forms/form-controllers/ItemSelector';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../../utils/BaseURL';

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

function EditBasicInformation({ formData, fatchedData }) {
	const theme = useTheme();
	const [cover, setCover] = useState(null);
	const [coverPreview, setCoverPreview] = useState(null);

	const [files, setFiles] = useState([]);
	const [filesPreview, setFilesPreview] = useState([]);

	const [productTitle, setProductTitle] = useState('');
	const [productBanglaTitle, setProductBanglaTitle] = useState('');
	const [productCategory, setProductCategory] = useState('');
	const [materialName, setMaterialName] = useState('');

	const [limit, setLimit] = useState(0);
	const [maxUploadMsg, setMaxUploadMsg] = useState('');
	const [miniReload, setMiniReload] = useState(false);

	const { prodId } = useSelector((state) => state.products);
	console.log('images:', files);

	//--------for product images(files)-------//
	useEffect(() => {
		if (files && files.length >= 3) {
			setMaxUploadMsg('You have reached maximum 3 files upload limit!');
		} else setMaxUploadMsg('');
	}, [files]);

	//-----------formData---------------//
	useEffect(() => {
		if (cover) {
			formData.append('cover', cover);
		}
		if (files) {
			files.forEach((file) => {
				formData.append('images', file);
			});
		}
		formData.append('englishTitle', productTitle);
		formData.append('banglaTitle', productBanglaTitle);
		formData.append('category', productCategory);
		formData.append('material', materialName);
	}, [
		cover,
		productTitle,
		productBanglaTitle,
		productCategory,
		materialName,
		formData,
	]);

	const data = fatchedData?.productBasicInformation;

	useEffect(() => {
		if (data) {
			setCoverPreview(data.productImage.cover);
			setFilesPreview(data.productImage.images);
			setProductTitle(data.productInfo.englishTitle);
			setProductBanglaTitle(data.productInfo.banglaTitle);
			setProductCategory(data.productInfo.category);
			setMaterialName(data.productInfo.material);
		}
	}, [data]);

	async function deletePreviousFile(image_url) {
		try {
			const response = await axios.patch(`${baseUrl}/api/products/${prodId}`, {
				image_url,
			});
			if (response.status === 200) {
				setMiniReload(true);
			}
		} catch (error) {
			console.log(' Error deleting image:', error);
		}
	}

	function handleFileDelete(index) {
		setFiles((fileArr) => fileArr.filter((_, i) => i !== index));
		setLimit((previous) => previous - 1);
	}

	const furnitureCategories = [
		'Living Room Furniture',
		'Bedroom Furniture',
		'Dining Room Furniture',
		'Office Furniture',
		'Storage & Shelving Units',
		'Beds & Mattresses',
		'Wardrobes & Cabinets',
		'Tables & Desks',
		'Chairs & Seating',
		'Home Decor & Accessories',
	];

	return (
		<Paper
			id='basic-info'
			sx={{
				width: '100%',
				padding: 4,
				boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
				}}>
				<EditNoteIcon sx={{ fontSize: 28 }} />
				<Typography color='primary' variant='h6' fontWeight={600}>
					Edit Basic Information of Product
				</Typography>
			</Box>

			<Paper variant='outlined' sx={{ padding: 3, mt: 3 }}>
				<Typography fontWeight={600}>Product Image/Video</Typography>
				<Typography color='#bbb'>Upload maximum 3 product image</Typography>

				{/*---------------- upload buttons and previews------------------ */}
				<Box
					sx={{
						maxWidth: '750px',
						display: 'flex',
						justifyContent: 'space-around',
						my: 3,
					}}>
					<Box sx={{ flex: '0 1 100%' }}>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<InputFileUploadSmall setState={setCover} />
						</Box>
						<Typography variant='subtitle2' textAlign='center' color='#ccc'>
							Cover image
						</Typography>

						{/* --------------------cover-preview: previous & updated------------- */}
						{
							<Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
								<Box>
									{coverPreview ? (
										<Paper
											variant='outlined'
											sx={{ height: 100, width: 100, mt: 4 }}>
											<Typography padding={1} variant='subtitle2'>
												Previous
											</Typography>
											<>
												<img src={coverPreview} height='100%' width='100%' />
											</>
										</Paper>
									) : null}
								</Box>
								<Box>
									{cover ? (
										<Paper
											variant='outlined'
											sx={{ height: 100, width: 100, mt: 4 }}>
											<>
												<Typography
													color={theme.palette.success.light}
													padding={1}
													variant='subtitle2'>
													Updated
												</Typography>
												<img
													src={URL.createObjectURL(cover)}
													height='100%'
													width='100%'
												/>
											</>
										</Paper>
									) : null}
								</Box>
							</Box>
						}
					</Box>

					<Divider orientation='vertical' flexItem />

					<Box sx={{ flex: '0 1 100%' }}>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<InputFileUploadSmall
								maxUpload={3}
								limit={limit}
								setLimit={setLimit}
								uploadType='multiple'
								setState={setFiles}
							/>
						</Box>
						<Typography variant='subtitle2' textAlign='center' color='#ccc'>
							Images (max-3)
						</Typography>

						{/* image-preview */}
						<Box sx={{ display: 'flex', gap: 3, mt: 4, paddingX: '22px' }}>
							<Box>
								{filesPreview.length > 0 ? (
									<Box sx={{ display: 'flex', gap: 3 }}>
										{filesPreview.map((item, index) => (
											<Paper
												key={index}
												variant='outlined'
												sx={{ position: 'relative', height: 100, width: 100 }}>
												<>
													<img src={item} height='100%' width='100%' />
													<Typography
														sx={{
															textAlign: 'center',
															fontSize: '0.8em',
														}}>
														{`image(${index + 1})`}
													</Typography>

													<StyledDeleteBtn
														onClick={() => deletePreviousFile(item)}>
														<ClearOutlined fontSize='1rem' />
													</StyledDeleteBtn>
												</>
											</Paper>
										))}
									</Box>
								) : null}
							</Box>
							<Box>
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

													<StyledDeleteBtn
														onClick={() => handleFileDelete(index)}>
														<ClearOutlined fontSize='1rem' />
													</StyledDeleteBtn>
												</>
											</Paper>
										))}
									</>
								) : null}
							</Box>
						</Box>

						{maxUploadMsg && (
							<Typography
								mt={4}
								paddingX={2}
								color={theme.palette.success.main}
								variant='subtitle2'>
								{maxUploadMsg}
							</Typography>
						)}
					</Box>
				</Box>

				{/*------------------------------------------------------------- */}
			</Paper>
			<Paper variant='outlined' sx={{ padding: 3, mt: 5 }}>
				<Typography fontWeight={600}>Product Information</Typography>

				<Box sx={{ mt: 2, maxWidth: { xl: '80%', md: '100%' } }}>
					<InputHandler
						required
						labelName='Product Name'
						state={productTitle}
						setState={setProductTitle}
						type='text'
						placeholder='Enter Product Name (English)'
						size='medium'
					/>

					<InputHandler
						required
						labelName='প্রোডাক্টের নাম'
						state={productBanglaTitle}
						setState={setProductBanglaTitle}
						type='text'
						placeholder='প্রোডাক্টের নাম (বাংলায়) (optional)'
						size='medium'
					/>
					<Box sx={{ display: 'flex', gap: 3 }}>
						<Box sx={{ flex: '0 1 100%' }}>
							<ItemSelector
								label='Select product category'
								state={productCategory}
								setState={setProductCategory}
								size='medium'
								options={furnitureCategories}
							/>
						</Box>

						<Box sx={{ flex: '0 1 100%', mt: '2px' }}>
							<InputHandler
								labelName='Product Material'
								state={materialName}
								setState={setMaterialName}
								type='text'
								placeholder='Material name (Ex. Wood,Glass etc)'
								size='medium'
							/>
						</Box>
					</Box>
				</Box>
			</Paper>
		</Paper>
	);
}

export default EditBasicInformation;
