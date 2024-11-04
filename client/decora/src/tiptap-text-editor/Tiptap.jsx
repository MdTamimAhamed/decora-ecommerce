import { Box, Button, Paper, styled, Typography } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import '../external-styles/style.css';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { alpha } from '@mui/system';
import { useSelector } from 'react-redux';
import ErrorMessage from '../components/forms/form-controllers/ErrorMessage';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import parse from 'html-react-parser';

const StyledButton = styled(Button)(({ theme }) => ({
	color: alpha(theme.palette.common.black, 0.6),
	borderColor: alpha(theme.palette.common.black, 0.6),
	textTransform: 'capitalize',
	'&:hover': {
		color: alpha(theme.palette.primary.main, 1),
	},
}));

const limit = 2500;

const extensions = [
	StarterKit,
	Placeholder.configure({ placeholder: 'Write description here...' }),
	CharacterCount.configure({ limit }),
];

const Tiptap = ({ setState, isError, content, fetchedData }) => {
	const theme = useTheme();
	const { validationErrors } = useSelector((state) => state.products);
	const editor = useEditor({
		editorProps: {
			attributes: {
				class: 'focus:outline-none',
			},
		},
		extensions,
		content: content || '',
		onUpdate: ({ editor }) => {
			setState(editor.getHTML() || '');
		},
	});

	useEffect(() => {
		if (editor && fetchedData) {
			editor.commands.setContent(fetchedData?.productDescription);
		} else {
			editor.commands.setContent('');
		}
	}, [editor, fetchedData]);

	if (!editor) return null;

	return (
		<Box>
			<Paper
				variant='outlined'
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 1,
					padding: 2,
				}}>
				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'is-active' : ''}>
					<FormatBoldIcon />
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'is-active' : ''}>
					<FormatItalicIcon />
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive('paragraph') ? 'is-active' : ''}>
					<Typography variant='body1' fontWeight={900}>
						P
					</Typography>
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={
						editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
					}>
					Heading1
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={
						editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
					}>
					Heading2
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={
						editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
					}>
					Heading3
				</StyledButton>

				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'is-active' : ''}>
					<FormatListBulletedIcon />
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor.isActive('orderedList') ? 'is-active' : ''}>
					<FormatListNumberedIcon />
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive('blockquote') ? 'is-active' : ''}>
					<FormatQuoteIcon />
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().setHorizontalRule().run()}>
					<HorizontalRuleIcon />
				</StyledButton>

				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}>
					Undo
				</StyledButton>
				<StyledButton
					variant='outlined'
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}>
					Redo
				</StyledButton>
			</Paper>
			<Paper
				variant='outlined'
				sx={{ mt: 2, padding: 2, position: 'relative' }}>
				<EditorContent
					style={{ height: '200px', overflow: 'auto' }}
					editor={editor}
				/>

				<Box sx={{ position: 'absolute', bottom: 2, right: 10, color: '#aaa' }}>
					{editor.storage.characterCount.characters()} / {limit} characters
				</Box>
			</Paper>
			{isError && (
				<ErrorMessage
					isEmpty={content}
					check={validationErrors.productDescription}
				/>
			)}
		</Box>
	);
};

export default Tiptap;
