import { Typography, Paper, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Tiptap from '../../../../tiptap-text-editor/Tiptap';
import EditNoteIcon from '@mui/icons-material/EditNote';

function EditProductDescription({ formData, fetchedData }) {
	const [editorContent, setEditorContent] = useState(``);

	useEffect(() => {
		formData.delete('productDescription');
		if (editorContent) {
			formData.append('productDescription', editorContent);
		}
	}, [editorContent, formData]);

	return (
		<Paper
			id='description'
			sx={{
				width: '100%',
				padding: 4,
				mt: 8,
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
					Edit Product Description
				</Typography>
			</Box>

			<Paper variant='outlined' sx={{ padding: 3, mt: 3, overflowX: 'auto' }}>
				<Box>
					<Typography mb={1} fontWeight={600}>
						Write Product Description
					</Typography>
					<Tiptap
						fetchedData={fetchedData}
						content={editorContent}
						setState={setEditorContent}
					/>
				</Box>
			</Paper>
		</Paper>
	);
}

export default EditProductDescription;
