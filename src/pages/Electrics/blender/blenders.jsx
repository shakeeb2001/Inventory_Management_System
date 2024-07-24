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
import { Add, Remove, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const Item = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
  const [currentItemCode, setCurrentItemCode] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://fancy-palace-backend.vercel.app/api/blender');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setItemData({
      name: '',
      code: '',
      quantity: '',
      costCode: '',
      costPrice: '',
      taggedPrice: '',
      sellingPrice: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value
    });
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('https://fancy-palace-backend.vercel.app/api/blender', itemData);
      setItems([...items, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  const handleEditItem = async () => {
    try {
      const response = await axios.put(`https://fancy-palace-backend.vercel.app/api/blender/${currentItemCode}`, itemData);
      const updatedItems = items.map(item =>
        item.code === currentItemCode ? response.data : item
      );
      setItems(updatedItems);
      handleClose();
    } catch (error) {
      console.error('Error updating item:', error.message);
    }
  };

  const handleDeleteItem = async (code) => {
    try {
      await axios.delete(`https://fancy-palace-backend.vercel.app/api/blender/${code}`);
      setItems(items.filter(item => item.code !== code));
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleDecreaseQuantity = async (code) => {
    try {
      const response = await axios.patch(`https://fancy-palace-backend.vercel.app/api/blender/${code}/decrease`);
      const updatedItems = items.map(item =>
        item.code === code ? response.data : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error('Error decreasing quantity:', error.message);
    }
  };

  const handleEditClick = (item) => {
    setItemData(item);
    setCurrentItemCode(item.code);
    setEditMode(true);
    setOpen(true);
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
        Blenders
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
        <DialogTitle>{editMode ? 'Edit Item' : 'Add New Item'}</DialogTitle>
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
            disabled={editMode}
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
          <Button onClick={editMode ? handleEditItem : handleAddItem} color="primary">
            {editMode ? 'Update' : 'Add'}
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
                  <IconButton
                    color="secondary"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteItem(item.code)}
                  >
                    <Delete />
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
