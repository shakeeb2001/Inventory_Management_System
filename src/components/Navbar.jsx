// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Perform any necessary logout operations here, such as clearing tokens
//     navigate('/login');
//   };

//   return (
//     <AppBar position="fixed">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Fancy Palace
//         </Typography>
//         <Box>
//           <Button color="inherit" component={Link} to="/">
//             Home
//           </Button>
//           <Button color="inherit" component={Link} to="/pay">
//             Pay
//           </Button>
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fancy Palace
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/pay">
            Pay
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
