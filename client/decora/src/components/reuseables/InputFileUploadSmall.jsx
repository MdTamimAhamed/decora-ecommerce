import React, { useState } from 'react';
import { Button, styled } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 2,
	overflow: 'auto',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 2,
});

function InputFileUploadSmall({
	setState,
	limit,
	setLimit,
	uploadType,
	maxUpload,
}) {
	function handleFileUpload(e) {
		if (uploadType === 'multiple' || uploadType === 'Multiple') {
			const filesArray = Array.from(e.target.files);

			filesArray.forEach((file) => {
				setState((previousFile) => {
					return [...previousFile, file];
				});
				setLimit((prevCount) => prevCount + 1);
			});
		} else {
			setState(e.target.files[0]);
		}
	}

	return (
		<Button
			component='label'
			role={undefined}
			variant='outlined'
			disabled={limit >= maxUpload ? true : false}
			tabIndex={-1}
			sx={{
				my: '10px',
				borderWidth: '2px',
				borderStyle: 'dashed',
				width: 100,
				height: 100,
				minWidth: 0,
				borderRadius: '20%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				'& .MuiButton-startIcon': {
					margin: 0,
					fontSize: '40px',
				},
				'& .MuiButton-startIcon>*:nth-of-type(1)': {
					fontSize: '40px',
				},
				':hover': {
					borderWidth: '2px',
					borderStyle: 'dashed',
				},
			}}
			startIcon={<AddCircleOutlineIcon />}>
			<VisuallyHiddenInput
				type='file'
				accept='.jpg, .png, .jpeg'
				onChange={handleFileUpload}
			/>
		</Button>
	);
}

export default InputFileUploadSmall;
