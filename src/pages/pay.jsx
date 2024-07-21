// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   Button,
//   TextField,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   List,
//   ListItem,
//   ListItemText
// } from '@mui/material';
// import { Add, Remove, ShoppingCart } from '@mui/icons-material';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Webcam from 'react-webcam';
// import Quagga from 'quagga';

// const Pay = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cart, setCart] = useState(location.state?.cart || []);
//   const [scanning, setScanning] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [items, setItems] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const webcamRef = useRef(null);

//   const categories = {
//     blenders: 'https://fancy-palace-backend.vercel.app/api/blender',
//     fans: 'https://fancy-palace-backend.vercel.app/api/fan',
//     gascooker: 'https://fancy-palace-backend.vercel.app/api/gascooker',
//     heaterjug: 'https://fancy-palace-backend.vercel.app/api/heaterjug',
//     iron: 'https://fancy-palace-backend.vercel.app/iron',
//     ricecooker: 'https://fancy-palace-backend.vercel.app/ricecooker',
//     soundsystem: 'https://fancy-palace-backend.vercel.app/soundsystem',
//     torch: 'https://fancy-palace-backend.vercel.app/torch',
//     'plastic-metal': 'https://fancy-palace-backend.vercel.app/plastic-metal',
//     ceramic: 'https://fancy-palace-backend.vercel.app/api/ceramic'
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [selectedCategory]);

//   const fetchItems = async () => {
//     if (selectedCategory) {
//       try {
//         const response = await axios.get(categories[selectedCategory]);
//         setItems(response.data);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       }
//     }
//   };

//   const handleStartScanning = () => {
//     setScanning(true);
//   };

//   const handleBarcodeDetected = useCallback((result) => {
//     const detectedCode = result.codeResult.code;
//     const item = items.find(item => item.code === detectedCode);
//     if (item) {
//       handleAddToCart(item);
//     }
//     setScanning(false);
//     Quagga.stop();
//   }, [items]);

//   useEffect(() => {
//     if (scanning) {
//       Quagga.init({
//         inputStream: {
//           type: 'LiveStream',
//           constraints: {
//             facingMode: 'environment'
//           },
//           target: webcamRef.current.video
//         },
//         decoder: {
//           readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader']
//         }
//       }, (err) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         Quagga.start();
//       });

//       Quagga.onDetected(handleBarcodeDetected);

//       return () => {
//         Quagga.offDetected(handleBarcodeDetected);
//         Quagga.stop();
//       };
//     }
//   }, [scanning, handleBarcodeDetected]);

//   const handleAddToCart = (item) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(cartItem => cartItem.code === item.code);
//       if (existingItem) {
//         return prevCart.map(cartItem => 
//           cartItem.code === item.code 
//             ? { ...cartItem, quantity: cartItem.quantity + 1 } 
//             : cartItem
//         );
//       } else {
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });
//     handleDecreaseQuantity(item.code, 1);
//   };

//   const handleDecreaseQuantity = async (code, quantity) => {
//     try {
//       await axios.patch(`https://fancy-palace-backend.vercel.app/api/decrease-quantity/${code}`, { quantity });
//     } catch (error) {
//       console.error('Error decreasing quantity:', error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.length > 1) {
//       const filteredSuggestions = items.filter(item => item.code.toLowerCase().includes(query.toLowerCase()));
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     setItems([]); // Clear items when category changes
//     setSuggestions([]);
//   };

//   const handleAddItemByCode = (code) => {
//     const item = items.find(item => item.code === code || item.code === searchQuery);
//     if (item) {
//       handleAddToCart(item);
//       setSearchQuery('');
//       setSuggestions([]);
//     }
//   };

//   const handleRemoveFromCart = (code) => {
//     setCart(prevCart => {
//       const itemToRemove = prevCart.find(cartItem => cartItem.code === code);
//       if (itemToRemove.quantity > 1) {
//         return prevCart.map(cartItem => 
//           cartItem.code === code 
//             ? { ...cartItem, quantity: cartItem.quantity - 1 } 
//             : cartItem
//         );
//       } else {
//         return prevCart.filter(cartItem => cartItem.code !== code);
//       }
//     });
//     handleDecreaseQuantity(code, -1);
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
//   };

//   const handlePrintInvoice = () => {
//     const invoiceWindow = window.open('', 'PRINT', 'height=600,width=800');
//     invoiceWindow.document.write(`
//       <html>
//         <head>
//           <title>Invoice</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 20px;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 40px;
//             }
//             .header h1 {
//               margin: 0;
//             }
//             .header p {
//               margin: 5px 0;
//             }
//             table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-bottom: 20px;
//             }
//             table, th, td {
//               border: 1px solid black;
//             }
//             th, td {
//               padding: 10px;
//               text-align: left;
//             }
//             .total {
//               text-align: right;
//               margin-top: 20px;
//             }
//             .signature {
//               margin-top: 50px;
//               text-align: right;
//               margin-right: 50px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>Fancy Palace</h1>
//             <p>No. 17, Beliatte Rd, Dickwella, Sri Lanka</p>
//             <p>Phone - 077 9697 099</p>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Item Name</th>
//                 <th>Quantity</th>
//                 <th>Unit Price</th>
//                 <th>Total Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${cart.map(item => `
//                 <tr>
//                   <td>${item.name}</td>
//                   <td>${item.quantity}</td>
//                   <td>Rs. ${item.sellingPrice}.00</td>
//                   <td>Rs. ${item.sellingPrice * item.quantity}.00</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//           <div class="total">
//             <strong>Total: Rs. ${calculateTotal()}.00</strong>
//           </div>
//           <div class="signature">
//             <p>Authorized Signature: ____________________</p>
//           </div>
//         </body>
//       </html>
//     `);
//     invoiceWindow.document.close();
//     invoiceWindow.focus();
//     invoiceWindow.print();
//     invoiceWindow.close();
//   };

//   const handleBackToItems = () => {
//     navigate('/');
//   };

//   return (
//     <Container style={{ marginTop: '100px' }}>
//       <Typography variant="h4" gutterBottom>
//         Invoice
//       </Typography>
//       <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
//         <FormControl variant="outlined" style={{ minWidth: 150, marginRight: 20 }}>
//           <InputLabel>Category</InputLabel>
//           <Select
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//             label="Category"
//           >
//             {Object.keys(categories).map(category => (
//               <MenuItem key={category} value={category}>
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           margin="normal"
//           label="Enter Item Code"
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           style={{ marginRight: 20 }}
//         />
//         <Button variant="contained" color="primary" onClick={() => handleAddItemByCode(searchQuery)}>
//           Add Item
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleStartScanning} startIcon={<ShoppingCart />}>
//           Scan Barcode
//         </Button>
//       </Box>
//       {suggestions.length > 0 && (
//         <List component="nav">
//           {suggestions.map((suggestion, index) => (
//             <ListItem button key={index} onClick={() => handleAddItemByCode(suggestion.code)}>
//               <ListItemText primary={suggestion.code} />
//             </ListItem>
//           ))}
//         </List>
//       )}
//       {scanning && (
//         <div style={{ position: 'relative', width: '100%', height: '400px' }}>
//           <Webcam
//             ref={webcamRef}
//             audio={false}
//             screenshotFormat="image/jpeg"
//             width="100%"
//             height="100%"
//           />
//           <div style={{ 
//             position: 'absolute', 
//             top: '50%', 
//             left: 0, 
//             right: 0, 
//             height: '2px', 
//             backgroundColor: 'red' 
//           }} />
//         </div>
//       )}
//       <TableContainer component={Paper} style={{ marginTop: 20 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Item Name</TableCell>
//               <TableCell>Item Code</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Unit Price</TableCell>
//               <TableCell>Total Price</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {cart.map((cartItem, index) => (
//               <TableRow key={index}>
//                 <TableCell>{cartItem.name}</TableCell>
//                 <TableCell>{cartItem.code}</TableCell>
//                 <TableCell>{cartItem.quantity}</TableCell>
//                 <TableCell>{cartItem.sellingPrice}</TableCell>
//                 <TableCell>{cartItem.sellingPrice * cartItem.quantity}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="secondary"
//                     onClick={() => handleRemoveFromCart(cartItem.code)}
//                   >
//                     <Remove />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box display="flex" justifyContent="flex-end" marginTop={2}>
//         <Typography variant="h6" style={{ marginRight: 20 }}>
//           Total: Rs.{calculateTotal()}.00
//         </Typography>
//       </Box>
//       <Box display="flex" justifyContent="flex-end" marginTop={2}>
//         <Button variant="contained" color="primary" onClick={handlePrintInvoice}>
//           Print Invoice
//         </Button>
//         <Button variant="contained" color="secondary" onClick={handleBackToItems} style={{ marginLeft: 10 }}>
//           Back to Items
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Pay;

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Webcam from 'react-webcam';
import Quagga from 'quagga';

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [scanning, setScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const webcamRef = useRef(null);
  const beepRef = useRef(null);

  const categories = {
    blenders: 'https://fancy-palace-backend.vercel.app/api/blender',
    fans: 'https://fancy-palace-backend.vercel.app/api/fan',
    gascooker: 'https://fancy-palace-backend.vercel.app/api/gascooker',
    heaterjug: 'https://fancy-palace-backend.vercel.app/api/heaterjug',
    iron: 'https://fancy-palace-backend.vercel.app/iron',
    ricecooker: 'https://fancy-palace-backend.vercel.app/ricecooker',
    soundsystem: 'https://fancy-palace-backend.vercel.app/soundsystem',
    torch: 'https://fancy-palace-backend.vercel.app/torch',
    'plastic-metal': 'https://fancy-palace-backend.vercel.app/plastic-metal',
    ceramic: 'https://fancy-palace-backend.vercel.app/api/ceremic'
  };

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  const fetchItems = async () => {
    if (selectedCategory) {
      try {
        const response = await axios.get(categories[selectedCategory]);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
  };

  const handleStartScanning = () => {
    setScanning(true);
  };

  const handleBarcodeDetected = useCallback((result) => {
    const detectedCode = result.codeResult.code;
    const item = items.find(item => item.code === detectedCode);
    if (item) {
      handleAddToCart(item);
    }
    setScanning(false);
    Quagga.stop();
  }, [items]);

  useEffect(() => {
    if (scanning) {
      Quagga.init({
        inputStream: {
          type: 'LiveStream',
          constraints: {
            facingMode: 'environment'
          },
          target: webcamRef.current.video
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader']
        }
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected(handleBarcodeDetected);

      return () => {
        Quagga.offDetected(handleBarcodeDetected);
        Quagga.stop();
      };
    }
  }, [scanning, handleBarcodeDetected]);

  const handleAddToCart = (item) => {
    beepRef.current.play();
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.code === item.code);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.code === item.code 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    handleDecreaseQuantity(item.code, 1);
  };

  const handleDecreaseQuantity = async (code, quantity) => {
    try {
      await axios.patch(`https://fancy-palace-backend.vercel.app/api/decrease-quantity/${code}`, { quantity });
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const filteredSuggestions = items.filter(item => item.code.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setItems([]); // Clear items when category changes
    setSuggestions([]);
  };

  const handleAddItemByCode = (code) => {
    const item = items.find(item => item.code === code || item.code === searchQuery);
    if (item) {
      handleAddToCart(item);
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  const handleRemoveFromCart = (code) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(cartItem => cartItem.code === code);
      if (itemToRemove.quantity > 1) {
        return prevCart.map(cartItem => 
          cartItem.code === code 
            ? { ...cartItem, quantity: cartItem.quantity - 1 } 
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.code !== code);
      }
    });
    handleDecreaseQuantity(code, -1);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
  };

  const saveSale = async (totalAmount) => {
    try {
      await axios.post('https://fancy-palace-backend.vercel.app/api/sale', { totalAmount });
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  const handlePrintInvoice = async () => {
    const totalAmount = calculateTotal();
    await saveSale(totalAmount);

    const invoiceWindow = window.open('', 'PRINT', 'height=600,width=800');
    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .header h1 {
              margin: 0;
            }
            .header p {
              margin: 5px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
            .total {
              text-align: right;
              margin-top: 20px;
            }
            .signature {
              margin-top: 50px;
              text-align: right;
              margin-right: 50px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Fancy Palace</h1>
            <p>No. 17, Beliatte Rd, Dickwella, Sri Lanka</p>
            <p>Phone - 077 9697 099</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              ${cart.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>Rs. ${item.sellingPrice}.00</td>
                  <td>Rs. ${item.sellingPrice * item.quantity}.00</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <strong>Total: Rs. ${totalAmount}.00</strong>
          </div>
          <div class="signature">
            <p>Authorized Signature: ____________________</p>
          </div>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.focus();
    invoiceWindow.print();
    invoiceWindow.close();
  };

  const handleBackToItems = () => {
    navigate('/');
  };

  return (
    <Container style={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Invoice
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <FormControl variant="outlined" style={{ minWidth: 150, marginRight: 20 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            {Object.keys(categories).map(category => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          label="Enter Item Code"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginRight: 20 }}
        />
        <Button variant="contained" color="primary" onClick={() => handleAddItemByCode(searchQuery)}>
          Add Item
        </Button>
        <Button variant="contained" color="primary" onClick={handleStartScanning} startIcon={<ShoppingCart />}>
          Scan Barcode
        </Button>
      </Box>
      {suggestions.length > 0 && (
        <List component="nav">
          {suggestions.map((suggestion, index) => (
            <ListItem button key={index} onClick={() => handleAddItemByCode(suggestion.code)}>
              <ListItemText primary={suggestion.code} />
            </ListItem>
          ))}
        </List>
      )}
      {scanning && (
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            width="100%"
            height="100%"
          />
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: 0, 
            right: 0, 
            height: '2px', 
            backgroundColor: 'red' 
          }} />
        </div>
      )}
      <audio ref={beepRef} src="/beep-07.wav" />
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((cartItem, index) => (
              <TableRow key={index}>
                <TableCell>{cartItem.name}</TableCell>
                <TableCell>{cartItem.code}</TableCell>
                <TableCell>{cartItem.quantity}</TableCell>
                <TableCell>{cartItem.sellingPrice}</TableCell>
                <TableCell>{cartItem.sellingPrice * cartItem.quantity}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveFromCart(cartItem.code)}
                  >
                    <Remove />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Typography variant="h6" style={{ marginRight: 20 }}>
          Total: Rs.{calculateTotal()}.00
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button variant="contained" color="primary" onClick={handlePrintInvoice}>
          Print Invoice
        </Button>
        <Button variant="contained" color="secondary" onClick={handleBackToItems} style={{ marginLeft: 10 }}>
          Back to Items
        </Button>
      </Box>
    </Container>
  );
};

export default Pay;
