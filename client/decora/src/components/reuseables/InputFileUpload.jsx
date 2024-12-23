import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export default function InputFileUpload({ setState, btnText }) {
	return (
		<Button
			component='label'
			role={undefined}
			variant='contained'
			tabIndex={-1}
			startIcon={<CloudUploadIcon />}>
			{btnText || 'Upload file'}
			<VisuallyHiddenInput
				type='file'
				accept='.jpg, .png, .jpeg'
				onChange={(e) => setState(e.target.files[0])}
			/>
		</Button>
	);
}
