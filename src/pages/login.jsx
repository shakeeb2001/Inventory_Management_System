// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (event) => {
//     event.preventDefault();
//     // Handle the login logic here
//     console.log('Username:', username);
//     console.log('Password:', password);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//       >
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         <form onSubmit={handleLogin} style={{ width: '100%' }}>
//           <TextField
//             label="Username"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             style={{ marginTop: '16px' }}
//           >
//             Login
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://fancy-palace-backend.vercel.app/login', { username, password });
      setMessage(response.data.message);
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        {message && <Typography color="error" gutterBottom>{message}</Typography>}
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
