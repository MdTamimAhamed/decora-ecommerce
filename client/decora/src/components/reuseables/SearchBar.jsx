import { alpha, Box, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.4),
	width: '100%',
}));

const StyledSearchIconWrapper = styled('div')(({ theme }) => ({
	height: '100%',
	padding: theme.spacing(0, 2),
	position: 'absolute',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	width: '100%',
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1.5, 1, 1.5, 6),
	},
}));

function SearchBar({ placeholder, iconColor }) {
	return (
		<Box>
			<Search>
				<StyledSearchIconWrapper>
					<SearchIcon color={iconColor || ''} />
				</StyledSearchIconWrapper>
				<StyledInputBase name='search' placeholder={placeholder} />
			</Search>
		</Box>
	);
}

export default SearchBar;
