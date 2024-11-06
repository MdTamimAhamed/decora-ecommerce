import {
  Box,
  Button,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  RadioGroup,
  FormControl,
  Radio,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

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

function FilterBar({ onApplyFilters, onClearFilters }) {
  const theme = useTheme();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedRating, setSelectedRating] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategories(
      selectedCategories.includes(e.target.value)
        ? selectedCategories.filter((cat) => cat !== e.target.value)
        : [...selectedCategories, e.target.value]
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      category: selectedCategories,
      price: priceRange || [0, 50000],
      rating: selectedRating,
    });
  };

  return (
    <Paper
      variant="outlined"
      sx={{ flex: '0 1 20%', height: '120vh', padding: 2 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography fontSize={18} fontWeight={700}>
          Filter Products
        </Typography>
        <Button
          sx={{
            textTransform: 'capitalize',
            color: theme.palette.secondary.main,
          }}
        >
          Clear all
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
        <Typography fontSize={14} fontWeight={600}>
          By Category
        </Typography>
        {furnitureCategories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
                value={category}
                size="small"
                color="secondary"
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: '14px',
                  ':hover': { color: theme.palette.secondary.main },
                }}
              >
                {category}
              </Typography>
            }
          />
        ))}
      </Paper>

      <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
        <Typography fontSize={14} fontWeight={600}>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={50000}
          size="small"
          color="primary"
        />
        <Typography
          fontSize={14}
        >{`Min: ${priceRange[0]} - Max: ${priceRange[1]}`}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
        <Typography fontSize={14} fontWeight={600}>
          By Rating
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={selectedRating} onChange={handleRatingChange}>
            <FormControlLabel
              value="5"
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontSize: '14px',
                    ':hover': { color: theme.palette.secondary.main },
                  }}
                >
                  5 Stars
                </Typography>
              }
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontSize: '14px',
                    ':hover': { color: theme.palette.secondary.main },
                  }}
                >
                  4 Stars & Up
                </Typography>
              }
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontSize: '14px',
                    ':hover': { color: theme.palette.secondary.main },
                  }}
                >
                  3 Stars & Up
                </Typography>
              }
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontSize: '14px',
                    ':hover': { color: theme.palette.secondary.main },
                  }}
                >
                  2 Stars & Up
                </Typography>
              }
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontSize: '14px',
                    ':hover': { color: theme.palette.secondary.main },
                  }}
                >
                  1 Stars & Up
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      </Paper>

      <Button
        variant="outlined"
        sx={{ mt: 2, textTransform: 'capitalize' }}
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </Paper>
  );
}

export default FilterBar;
