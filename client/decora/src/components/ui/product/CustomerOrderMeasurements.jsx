import { Box, Button, Paper, Typography } from '@mui/material';
import ItemSelector from '../../forms/form-controllers/ItemSelector';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { alpha } from '@mui/system';
import OrderQuantity from '../../reuseables/OrderQuantity';
import { toast } from 'react-toastify';

const CustomerOrderMeasurements = ({ data, state, setState }) => {
  const theme = useTheme();
  const [customHeight, setCustomHeight] = useState(0);
  const [customWidth, setCustomWidth] = useState(0);
  const [customLength, setCustomLength] = useState(0);
  const [customMetric, setCustomMetric] = useState('');
  const [quantity, setQuantity] = useState(1);

  const measurements =
    data?.productPriceStockAndVarient?.customOrder?.customOrderMeasurements;
  const minHeight = Number(measurements?.minHeight?.value);
  const maxHeight = Number(measurements?.maxHeight?.value);
  const minWidth = Number(measurements?.minWidth?.value);
  const maxWidth = Number(measurements?.maxWidth?.value);
  const minLength = Number(measurements?.minLength?.value);
  const maxLength = Number(measurements?.maxLength?.value);

  const generate = (minValue, maxValue) => {
    return Array.from(
      { length: maxValue - minValue + 1 },
      (_, index) => minValue + index
    );
  };

  const heightOptions = generate(minHeight, maxHeight);
  const widthOptions = generate(minWidth, maxWidth);
  const lengthOptions = generate(minLength, maxLength);
  const metric = measurements?.minHeight?.metric;

  const handleAddCustomOrder = () => {
    if (customHeight && customWidth && customLength && customMetric) {
      setState({
        height: customHeight,
        width: customWidth,
        length: customLength,
        metric: customMetric,
        customQuantity: quantity,
      });
      toast.success('Custom order added!');
    } else {
      setState({});
      toast.error('All the custom order fields are required!');
    }
  };

  return (
    <>
      <Paper
        sx={{
          mt: 1,
          paddingY: 1,
          color: theme.palette.warning.dark,
          bgcolor: alpha(theme.palette.warning.light, 0.1),
        }}
        variant="contained"
      >
        <ul>
          <li>
            <Typography variant="subtitle2">
              Please select the height, width, length and metric of your custom
              order.
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle2">
              Customer order's delivery time wil be longer than regular!
            </Typography>
          </li>
        </ul>
      </Paper>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <ItemSelector
          label="Height"
          options={heightOptions}
          state={customHeight}
          setState={setCustomHeight}
        />
        <ItemSelector
          label="Width"
          options={widthOptions}
          state={customWidth}
          setState={setCustomWidth}
        />
        <ItemSelector
          label="Length"
          options={lengthOptions}
          state={customLength}
          setState={setCustomLength}
        />
        <ItemSelector
          label="Metic"
          options={[metric]}
          state={customMetric}
          setState={setCustomMetric}
        />
      </Box>

      <Box>
        <Typography fontWeight={600}>Custom Order Quantity:</Typography>
        <Box mb={2} display="flex" justifyContent="space-between">
          <OrderQuantity
            state={quantity}
            setState={setQuantity}
            maxQuantity={5}
            minQuantity={1}
          />
          <Button
            size="small"
            onClick={handleAddCustomOrder}
            variant="contained"
            sx={{ textTransform: 'capitalize' }}
          >
            Include Custom Order
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CustomerOrderMeasurements;
