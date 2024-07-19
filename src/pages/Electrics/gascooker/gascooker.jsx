import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

const Item = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({
    name: '',
    code: '',
    quantity: '',
    costCode: '',
    costPrice: '',
    taggedPrice: '',
    sellingPrice: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/gascooker');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value
    });
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/gascooker', itemData);
      setItems([...items, response.data]);
      setItemData({
        name: '',
        code: '',
        quantity: '',
        costCode: '',
        costPrice: '',
        taggedPrice: '',
        sellingPrice: ''
      });
      handleClose();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDecreaseQuantity = async (code) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/gascooker/${code}/decrease`);
      const updatedItems = items.map(item =>
        item.code === code ? response.data : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter(item => 
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container style={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Gas Coockers
      </Typography>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<Add />}>
          Add Item
        </Button>
      </Box>
      <TextField
        margin="normal"
        label="Search by Item Code"
        type="text"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginTop: 20, marginBottom: 20 }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Item Name"
            type="text"
            fullWidth
            name="name"
            value={itemData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Item Code"
            type="text"
            fullWidth
            name="code"
            value={itemData.code}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Quantity Available"
            type="number"
            fullWidth
            name="quantity"
            value={itemData.quantity}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Cost Code"
            type="text"
            fullWidth
            name="costCode"
            value={itemData.costCode}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Cost Price"
            type="number"
            fullWidth
            name="costPrice"
            value={itemData.costPrice}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Tagged Price"
            type="number"
            fullWidth
            name="taggedPrice"
            value={itemData.taggedPrice}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Selling Price"
            type="number"
            fullWidth
            name="sellingPrice"
            value={itemData.sellingPrice}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddItem} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Quantity Available</TableCell>
              <TableCell>Cost Code</TableCell>
              <TableCell>Cost Price</TableCell>
              <TableCell>Tagged Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.costCode}</TableCell>
                <TableCell>{item.costPrice}</TableCell>
                <TableCell>{item.taggedPrice}</TableCell>
                <TableCell>{item.sellingPrice}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleDecreaseQuantity(item.code)}
                  >
                    <Remove />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Item;
